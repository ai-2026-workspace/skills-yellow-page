export type EntryPoint = 'web' | 'app' | 'article';

export interface EntryPointConfig {
  id: EntryPoint;
  label: string;
  icon: string;
  description: string;
}

export const entryPoints: EntryPointConfig[] = [
  { id: 'web', label: '做网页', icon: '🎨', description: '前端开发、UI设计、网站搭建' },
  { id: 'app', label: '做 App', icon: '📱', description: 'iOS、Android 原生应用开发' },
  { id: 'article', label: '公众号文章', icon: '✍️', description: '文章编辑、内容处理、排版' }
];

export const entryPointSkills: Record<EntryPoint, string[]> = {
  web: ['frontend-dev', 'fullstack-dev', 'frontend-design', 'impeccable', 'taste-skill', 'commit-helper', 'pr-reviewer', 'agent-browser', 'composio-connect'],
  app: ['android-native-dev', 'ios-application-dev'],
  article: ['pdf-docx', 'summarize', 'ontology']
};