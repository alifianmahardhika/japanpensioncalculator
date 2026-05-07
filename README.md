# Japan Pension Calculator

An unofficial estimation tool for foreigners departing Japan who want to understand their pension options — lump-sum withdrawal (脱退一時金) and old-age pension (老齢年金).

Built by [eftax.co.jp](https://eftax.co.jp).

## Features

- **Lump-sum withdrawal estimate** — National Pension (NP) and Employees' Pension (EP) amounts with withholding tax breakdown
- **Old-age pension estimate** — monthly and annual figures from age 65 (Basic + Earnings-related)
- **MynaPortal verification guide** — maps 年金資格記録情報 fields directly to calculator inputs, with a grand-total cross-check
- **Multilingual** — English, 日本語, Bahasa Indonesia
- **Dark mode**
- **Projection mode** — enter your current portal total while modelling future contribution months

## Official Brochures

| Language | Link |
|---|---|
| English | [Lump-sum Withdrawal Payment (EN)](https://www.nenkin.go.jp/international/english/japanese-system/benefit/payment.files/A.pdf) |
| 日本語 | [脱退一時金 (JA)](https://www.nenkin.go.jp/international/japanese-system/withdrawalpayment/payment.files/A.pdf) |
| Bahasa Indonesia | [Lump-sum Withdrawal Payment (ID)](https://www.nenkin.go.jp/international/english/japanese-system/benefit/payment.files/F.pdf) |

Source: Japan Pension Service (March 2026).

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bun](https://bun.sh/) (package manager & dev server)
- Deployed on [Netlify](https://netlify.com/)

## Getting Started

```bash
bun install
bun run dev
```

## Disclaimer

This is an unofficial estimation tool. Actual amounts are determined by the Japan Pension Service. Always verify at [nenkin.go.jp](https://www.nenkin.go.jp).
