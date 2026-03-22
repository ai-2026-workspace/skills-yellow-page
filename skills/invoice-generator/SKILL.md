---
name: invoice-generator
description: Generate professional PDF invoices for freelancers and small studios. Use when the user asks to create, update, or re-issue an invoice (发票/Invoice), including adding/removing line items, changing client info, splitting invoices, or adjusting amounts. Produces clean A4 PDF output styled with a logo badge, itemized table, and totals section.
---

# Invoice Generator

Generate professional A4 PDF invoices using a JSON config + Python script workflow.

## Workflow

1. **Collect invoice data** from user (or infer from conversation context)
2. **Build config JSON** with all required fields
3. **Run script** to generate PDF
4. **Deliver PDF** to user; offer to adjust if needed

## Generate PDF

```bash
python3.11 /home/ubuntu/skills/invoice-generator/scripts/generate_invoice.py <config.json> <output.pdf>
```

Save config to a working directory (e.g. `/home/ubuntu/invoice/`) before running.

## Config Fields

| Field | Required | Notes |
|---|---|---|
| `invoice_number` | ✅ | e.g. `"2026001"` |
| `issue_date` | ✅ | `"YYYY-MM-DD"` |
| `due_date` | ✅ | `"YYYY-MM-DD"` (default: +30 days) |
| `seller_name_en` | ✅ | English company name |
| `seller_name_cn` | — | Chinese name shown below English |
| `seller_location` | ✅ | City, Province, Country |
| `seller_website` | — | Shown in header and footer |
| `seller_logo` | ✅ | 2-letter abbreviation e.g. `"QS"` |
| `logo_color` | — | Hex color, default `"#c0756a"` |
| `client_name` | ✅ | Buyer company or person name |
| `client_location` | — | e.g. `"Japan"` |
| `bank_name` | — | Leave empty `""` to show `—` |
| `account_holder` | — | |
| `account_number` | — | |
| `swift_code` | — | |
| `currency` | ✅ | e.g. `"CNY"`, `"USD"`, `"JPY"` |
| `items` | ✅ | Array of line items (see below) |
| `payment_due_amount` | — | Override total; omit to auto-sum |

### Item Object

```json
{
  "name": "Item display name",
  "description": "Optional subtitle shown in grey",
  "qty": 1,
  "unit_price": 10000.00
}
```

## Example Config

See `/home/ubuntu/skills/invoice-generator/templates/example_config.json` for a complete working example (西安桥水科技有限公司 → PinPon Inc.).

## Common Operations

**Split one invoice into two**: Build two separate configs sharing the same seller/client info, assign different `invoice_number` and `issue_date`, divide items between them.

**Remove a line item**: Delete the object from `items` array; totals are auto-recalculated.

**Multiple invoices in one session**: Save each config as `invoice_XXXXXX.json` and output as `invoice_XXXXXX.pdf`.

**Override total** (e.g. after discount): Set `payment_due_amount` to the final amount; subtotal still shows the raw sum.
