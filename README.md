# Relational Web Design

Vite + React site for [Olivier Rouiller](https://oilandrust.github.io/relational-design/), with homepage copy edited in [TinaCMS](https://tina.io).

## Local development

```bash
cp .env.example .env   # optional until you have Tina Cloud keys
npm install
npm run dev
```

- Site: http://localhost:5173/
- CMS: http://localhost:5173/admin/index.html

Edits in the admin are written to `content/pages/home.json`.

## Production CMS (Tina Cloud)

1. Create a Tina Cloud project for `oilandrust/relational-design`
2. Set the Site URL to `https://oilandrust.github.io/relational-design`
3. Add GitHub secrets `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN`
4. Put the same values in `.env` locally

Production admin: https://oilandrust.github.io/relational-design/admin/index.html

Saving in production commits to `main` and retriggers GitHub Pages.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
