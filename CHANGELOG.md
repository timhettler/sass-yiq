# Sass YIQ CHANGELOG

## 3.0.0 (08/07/26)

- BREAKING: Require Dart Sass `>=1.79.0` (was `>=1.45.0`). The Sass source now uses `color.channel()`, which is only available in Dart Sass `>=1.79.0`, so consumers on older Sass versions must upgrade.
- INTERNAL: Migrate off Sass functions deprecated for removal in Dart Sass 2.0: `color.red()`, `color.green()`, `color.blue()`, and `color.lightness()` are now `color.channel()`, and the `if()` function is now `@if`/`@else`. The library builds with zero deprecation warnings.

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
