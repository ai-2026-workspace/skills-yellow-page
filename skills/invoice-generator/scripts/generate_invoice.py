#!/usr/bin/env python3
"""
Invoice Generator Script
Usage: python generate_invoice.py <config_json_path> <output_pdf_path>

config_json fields:
  invoice_number  : str   e.g. "2026001"
  issue_date      : str   e.g. "2026-03-19"
  due_date        : str   e.g. "2026-04-19"
  seller_name_en  : str   e.g. "Xi'an Qiaoshui Technology Co., Ltd."
  seller_name_cn  : str   e.g. "西安桥水科技有限公司"
  seller_location : str   e.g. "Xi'an, Shaanxi Province, China"
  seller_website  : str   e.g. "aiheyi.taobao.com"  (optional)
  seller_logo     : str   two-letter abbreviation e.g. "QS"
  logo_color      : str   hex color e.g. "#c0756a"  (optional, default #c0756a)
  client_name     : str   e.g. "PinPon Inc."
  client_location : str   e.g. "Japan"
  bank_name       : str   (optional)
  account_holder  : str   (optional)
  account_number  : str   (optional)
  swift_code      : str   (optional)
  currency        : str   e.g. "CNY"
  items           : list of {name, description, qty, unit_price}
  payment_due_amount : float  (optional, auto-calculated if omitted)
"""

import json
import sys
import os
from weasyprint import HTML

def fmt(amount):
    return f"{amount:,.2f}"

def build_html(cfg):
    logo_color = cfg.get("logo_color", "#c0756a")
    logo_text  = cfg.get("seller_logo", "QS")
    currency   = cfg.get("currency", "CNY")
    website    = cfg.get("seller_website", "")

    # Calculate totals
    items = cfg.get("items", [])
    subtotal = sum(float(i["qty"]) * float(i["unit_price"]) for i in items)
    total = cfg.get("payment_due_amount", subtotal)

    # Build item rows
    rows_html = ""
    for item in items:
        amount = float(item["qty"]) * float(item["unit_price"])
        desc_html = f'<div class="idesc">{item.get("description","")}</div>' if item.get("description") else ""
        rows_html += f"""
      <tr>
        <td>
          <div class="iname">{item["name"]}</div>
          {desc_html}
        </td>
        <td class="r">{item["qty"]}</td>
        <td class="r">{fmt(float(item["unit_price"]))}</td>
        <td class="r">{fmt(amount)}</td>
      </tr>"""

    # Payment details
    bank_lines = ""
    if cfg.get("bank_name"):
        bank_lines += f'Bank Name: {cfg["bank_name"]}<br>\n'
    if cfg.get("account_holder"):
        bank_lines += f'Account Holder: {cfg["account_holder"]}<br>\n'
    if cfg.get("account_number"):
        bank_lines += f'Account Number: {cfg["account_number"]}<br>\n'
    if cfg.get("swift_code"):
        bank_lines += f'SWIFT Code: {cfg["swift_code"]}<br>\n'
    if not bank_lines:
        bank_lines = "—"

    website_line = f'<br>\n          {website}' if website else ""

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Invoice #{cfg['invoice_number']}</title>
<style>
  @page {{ size: A4; margin: 0; }}
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #222; background: #fff; }}
  .page {{ width: 210mm; min-height: 297mm; padding: 14mm 14mm 16mm 14mm; background: #fff; }}
  .header {{ display: flex; justify-content: space-between; align-items: flex-start; }}
  .header-left {{ display: flex; align-items: flex-start; gap: 12px; }}
  .logo-box {{ width: 52px; height: 52px; background: {logo_color}; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 700; flex-shrink: 0; }}
  .company-name {{ font-size: 13px; font-weight: 700; color: #222; margin-bottom: 3px; }}
  .company-addr {{ font-size: 11px; color: #555; line-height: 1.55; }}
  .header-right {{ text-align: right; font-size: 11px; color: #555; line-height: 1.8; }}
  .header-right .lbl {{ color: #999; font-size: 10px; }}
  .header-right .val {{ color: #222; font-weight: 600; }}
  .divider {{ height: 3px; background: {logo_color}; margin: 16px 0 22px; border-radius: 2px; }}
  .inv-title {{ font-size: 26px; font-weight: 700; color: #222; margin-bottom: 7px; }}
  .inv-sub {{ font-size: 11.5px; color: #666; margin-bottom: 22px; }}
  .info-row {{ display: flex; gap: 0; border-top: 1px solid #ddd; padding-top: 14px; margin-bottom: 22px; }}
  .info-col {{ flex: 1; padding-right: 12px; }}
  .info-col:last-child {{ padding-right: 0; }}
  .col-lbl {{ font-size: 9.5px; font-weight: 700; letter-spacing: 1px; color: #999; text-transform: uppercase; margin-bottom: 7px; }}
  .col-val {{ font-size: 11.5px; color: #333; line-height: 1.65; }}
  .col-val strong {{ font-weight: 700; color: #222; }}
  table {{ width: 100%; border-collapse: collapse; }}
  thead tr {{ border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; }}
  thead th {{ font-size: 9.5px; font-weight: 700; letter-spacing: 1px; color: #999; text-transform: uppercase; padding: 9px 6px 9px 0; text-align: left; }}
  thead th.r {{ text-align: right; padding-right: 0; }}
  tbody tr {{ border-bottom: 1px solid #eee; }}
  tbody td {{ padding: 12px 6px 10px 0; vertical-align: top; font-size: 11.5px; }}
  tbody td.r {{ text-align: right; padding-right: 0; }}
  .iname {{ font-weight: 600; color: #222; margin-bottom: 2px; }}
  .idesc {{ font-size: 10.5px; color: #999; }}
  .totals {{ margin-top: 24px; border-top: 1px solid #ddd; padding-top: 12px; }}
  .trow {{ display: flex; justify-content: space-between; font-size: 12px; color: #555; padding: 4px 0; }}
  .trow.due {{ font-size: 14px; font-weight: 700; color: #222; border-top: 1.5px solid #333; margin-top: 6px; padding-top: 9px; }}
  .footer {{ margin-top: 30px; font-size: 10.5px; color: #aaa; border-top: 1px solid #eee; padding-top: 12px; line-height: 1.7; }}
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="header-left">
      <div class="logo-box">{logo_text}</div>
      <div>
        <div class="company-name">{cfg['seller_name_en']}</div>
        <div class="company-addr">
          {cfg.get('seller_name_cn','')}<br>
          {cfg['seller_location']}{website_line}
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="lbl">Invoice #</div>
      <div class="val">{cfg['invoice_number']}</div>
      <div class="lbl" style="margin-top:5px;">Issue Date</div>
      <div class="val">{cfg['issue_date']}</div>
    </div>
  </div>

  <div class="divider"></div>

  <div class="inv-title">{cfg['seller_name_en']}</div>
  <div class="inv-sub">Thank you for your business. Please find the invoice details below.</div>

  <div class="info-row">
    <div class="info-col">
      <div class="col-lbl">Bill To</div>
      <div class="col-val">
        <strong>{cfg['client_name']}</strong><br>
        {cfg.get('client_location','')}
      </div>
    </div>
    <div class="info-col">
      <div class="col-lbl">Payment Details</div>
      <div class="col-val">{bank_lines}</div>
    </div>
    <div class="info-col">
      <div class="col-lbl">Payment</div>
      <div class="col-val">
        Due: {cfg['due_date']}<br>
        <strong>{currency} {fmt(total)}</strong>
      </div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:52%">Item</th>
        <th class="r" style="width:7%">Qty</th>
        <th class="r" style="width:20%">Unit Price ({currency})</th>
        <th class="r" style="width:21%">Amount ({currency})</th>
      </tr>
    </thead>
    <tbody>{rows_html}
    </tbody>
  </table>

  <div class="totals">
    <div class="trow">
      <span>Subtotal</span>
      <span>{currency} {fmt(subtotal)}</span>
    </div>
    <div class="trow due">
      <span>Total Due</span>
      <span>{currency} {fmt(total)}</span>
    </div>
  </div>

  <div class="footer">
    Please make payment within 30 days of the issue date.<br>
    For any questions regarding this invoice, please contact: {cfg['seller_name_en']} &nbsp;|&nbsp; {cfg['seller_location']}{(' &nbsp;|&nbsp; ' + website) if website else ''}
  </div>
</div>
</body>
</html>"""
    return html


def main():
    if len(sys.argv) != 3:
        print("Usage: python generate_invoice.py <config.json> <output.pdf>")
        sys.exit(1)

    config_path = sys.argv[1]
    output_path = sys.argv[2]

    with open(config_path, "r", encoding="utf-8") as f:
        cfg = json.load(f)

    html_content = build_html(cfg)

    # Write temp HTML
    html_path = output_path.replace(".pdf", "_tmp.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    HTML(filename=html_path).write_pdf(output_path)
    os.remove(html_path)
    print(f"Invoice generated: {output_path}")


if __name__ == "__main__":
    main()
