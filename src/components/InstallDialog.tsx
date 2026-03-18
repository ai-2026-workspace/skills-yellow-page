import { useState } from "react";
import { Copy, Check, ExternalLink, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Skill } from "@/data/skills";

function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center gap-3 bg-secondary border border-border rounded-xl px-5 py-4 font-mono text-base group cursor-pointer hover:border-foreground/30 transition-colors" onClick={copy}>
      <span className="text-foreground flex-1 select-all break-all">{text}</span>
      <button className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors" title="复制">
        {copied ? <Check className="h-5 w-5 text-foreground" /> : <Copy className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />}
      </button>
    </div>
  );
}

function StepItem({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold">
          {step}
        </div>
        <div className="flex-1 w-px bg-border mt-2" />
      </div>
      <div className="pb-7 flex-1">
        <h4 className="font-semibold text-foreground text-base mb-2.5">{title}</h4>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

interface InstallDialogProps {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstallDialog({ skill, open, onOpenChange }: InstallDialogProps) {
  if (!skill) return null;

  const claudeInstallCmd = skill.installCmd?.startsWith("npx skills")
    ? skill.installCmd
    : skill.installCmd?.startsWith("clawhub")
    ? `npx skills add ${skill.id}`
    : skill.installCmd || `npx skills add ${skill.id}`;

  const openclawInstallCmd = skill.installCmd?.startsWith("clawhub")
    ? skill.installCmd
    : `clawhub install ${skill.id}`;

  const codexInstallCmd = `codex install ${skill.id}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background shadow-elevated border border-border sm:max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-border/60">
          <DialogTitle className="text-xl font-display font-semibold text-foreground">
            安装 {skill.name}
          </DialogTitle>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">{skill.description}</p>
        </div>

        {/* Tabs */}
        <div className="px-8 py-6">
          <Tabs defaultValue={skill.ecosystem === "openclaw" ? "openclaw" : "claude"} className="w-full">
            <TabsList className="w-full bg-secondary h-14 p-1.5 rounded-xl mb-6 grid grid-cols-4 gap-1.5">
              <TabsTrigger value="claude" className="rounded-lg text-base font-semibold text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-elevated transition-all py-2.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-claude mr-2 data-[state=active]:opacity-80" />
                Claude
              </TabsTrigger>
              <TabsTrigger value="openclaw" className="rounded-lg text-base font-semibold text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-elevated transition-all py-2.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-openclaw mr-2" />
                OpenClaw
              </TabsTrigger>
              <TabsTrigger value="cursor" className="rounded-lg text-base font-semibold text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-elevated transition-all py-2.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-cursor mr-2" />
                Cursor
              </TabsTrigger>
              <TabsTrigger value="codex" className="rounded-lg text-base font-semibold text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-elevated transition-all py-2.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-codex mr-2" />
                Codex
              </TabsTrigger>
            </TabsList>

            {/* Claude Code */}
            <TabsContent value="claude" className="mt-0 space-y-0">
              <StepItem step={1} title="安装 Skill">
                <CopyBlock text={claudeInstallCmd} />
                <p className="text-sm text-muted-foreground">或手动克隆到 <code className="text-foreground font-mono">~/.claude/skills/</code></p>
              </StepItem>
              <StepItem step={2} title="在 Claude Code 中使用">
                <p className="text-base text-muted-foreground">安装后 Claude 会自动加载该 Skill。你也可以通过 <code className="text-foreground font-mono text-sm">/{skill.id}</code> 直接调用。</p>
              </StepItem>
              <StepItem step={3} title="查看文档">
                <a href={skill.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base text-foreground underline-offset-4 hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  查看完整文档 & 源码
                </a>
              </StepItem>
            </TabsContent>

            {/* OpenClaw */}
            <TabsContent value="openclaw" className="mt-0 space-y-0">
              <StepItem step={1} title="通过 ClawHub 安装">
                <CopyBlock text={openclawInstallCmd} />
                <p className="text-sm text-muted-foreground">需要先安装 <code className="text-foreground font-mono">npm i -g clawhub</code></p>
              </StepItem>
              <StepItem step={2} title="或通过商店一键安装">
                <p className="text-base text-muted-foreground">访问 <a href="https://clawhub.ai" target="_blank" className="text-foreground underline-offset-4 hover:underline">clawhub.ai</a> 或 <a href="https://oneclaw.cn" target="_blank" className="text-foreground underline-offset-4 hover:underline">oneclaw.cn</a> 搜索后一键安装。</p>
              </StepItem>
              <StepItem step={3} title="查看文档">
                <a href={skill.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base text-foreground underline-offset-4 hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  查看完整文档 & 源码
                </a>
              </StepItem>
            </TabsContent>

            {/* Cursor */}
            <TabsContent value="cursor" className="mt-0 space-y-0">
              <StepItem step={1} title="添加 Skills 到项目">
                <p className="text-base text-muted-foreground">在项目根目录创建 <code className="text-foreground font-mono">.cursor/skills/</code> 文件夹，将 Skill 的 <code className="text-foreground font-mono">SKILL.md</code> 放入其中。</p>
              </StepItem>
              <StepItem step={2} title="或通过 Rules 引用">
                <p className="text-base text-muted-foreground">在 Cursor Settings → Rules 中添加 Skill 的内容作为自定义规则，Cursor 会在每次对话中自动应用。</p>
              </StepItem>
              <StepItem step={3} title="使用 .cursorrules 文件">
                <p className="text-base text-muted-foreground">在项目根目录创建 <code className="text-foreground font-mono">.cursorrules</code> 文件，粘贴 Skill 内容即可全局生效。</p>
              </StepItem>
              <StepItem step={3} title="查看文档">
                <a href={skill.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base text-foreground underline-offset-4 hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  查看完整文档 & 源码
                </a>
              </StepItem>
            </TabsContent>

            <TabsContent value="codex" className="mt-0 space-y-0">
              <StepItem step={1} title="通过 Codex CLI 安装">
                <CopyBlock text={codexInstallCmd} />
                <p className="text-sm text-muted-foreground">需要先安装 OpenAI Codex CLI</p>
              </StepItem>
              <StepItem step={2} title="在 Codex 中使用">
                <p className="text-base text-muted-foreground">Codex 会自动识别并加载已安装的 Skills，也兼容大部分 Claude Skills 格式。</p>
              </StepItem>
              <StepItem step={3} title="查看文档">
                <a href={skill.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base text-foreground underline-offset-4 hover:underline">
                  <ExternalLink className="h-4 w-4" />
                  查看完整文档 & 源码
                </a>
              </StepItem>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer tip */}
        <div className="px-8 py-5 border-t border-border bg-secondary/50">
          <p className="text-sm text-muted-foreground">
            💡 安装后建议阅读 Skill 的 <code className="text-foreground font-mono">SKILL.md</code> 了解可用命令和最佳实践。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
