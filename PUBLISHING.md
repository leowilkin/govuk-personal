# Publishing Guide

## How to publish create-govuk-personal to NPM

### Prerequisites

1. NPM account with publish permissions
2. Logged in via `npm login`

### Steps

1. **Version bump** (if needed):

   ```bash
   npm version patch  # or minor/major
   ```

2. **Test locally**:

   ```bash
   # Test the create script
   cd ../
   mkdir test-project
   cd test-project
   node ../govuk-personal/index.js
   # Follow prompts to test creation
   cd ../
   rm -rf test-project
   ```

3. **Publish to NPM**:

   ```bash
   npm publish
   ```

4. **Test published version**:

   ```bash
   npm create govuk-personal@latest test-site
   ```

### Usage after publishing

Users can create new projects with:

```bash
npm create govuk-personal@latest my-site-name
cd my-site-name
npm run dev
```

### File structure

```
create-govuk-personal/
├── index.js           # Main create script
├── package.json       # Package metadata & dependencies
├── README.md          # Package documentation
└── template/          # Template files to copy
    ├── package.json   # Template's package.json
    ├── README.md      # Template's README
    ├── astro.config.mjs
    ├── tsconfig.json
    ├── public/        # Static assets
    └── src/           # Source code
        ├── components/
        ├── layouts/
        ├── pages/
        └── styles/
```

### Updating the template

When updating components or adding features:

1. **Make changes to the main project** (in `/src`, `/public`, etc.)
2. **Test your changes** locally:

   ```bash
   npm run dev
   ```

3. **Sync the template**:

   ```bash
   npm run sync-template
   ```

   This automatically copies all changes to the `template/` directory.
4. **Test the create script**:

   ```bash
   npm run test-create
   ```

5. **Update version and publish**:

   ```bash
   npm version patch  # or minor/major
   npm publish
   ```

### What gets synced automatically

The sync script copies everything except:

- `.git/` (version control)
- `node_modules/` (dependencies)
- `template/` (to avoid recursion)
- `.astro/` (build cache)
- `index.js` (create script)
- `PUBLISHING.md` (this file)
- `package-lock.json` (lock file)
