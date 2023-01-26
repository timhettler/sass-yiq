# Sass YIQ CHANGELOG

## 2.0.0 (01/25/22)

- BREAKING: Package name is now scoped: `@timhettler/sass-yiq`
- BREAKING: Switch to Dart Sass with Sass module system, dropping support for Node Sass.
- BREAKING: Move `sass` to `peerDependencies`.
- BREAKING: Drop `yiq-` from variable, module, and function names. Projects not using Sass modules can still `@import '<path>/@timhettler/sass-yiq/sass/yiq'` to access the former names.
- BREAKING: Removed Bower support.
- BREAKING: Removed Sache support.
- FEATURE: Added `\_index.scss` at the project root, for simpler import path: @use '<path>/@timhettler/sass-yiq'
- INTERNAL: Remove Grunt(!)
- INTERNAL: Update dev dependencies and package manager
