# Sass YIQ CHANGELOG

## 2.0.0 (01/25/22)

- BREAKING: Switch to Dart Sass with Sass module system, dropping support for Node Sass.
- BREAKING: Move `sass` to `peerDependencies`.
- BREAKING: Drop `$yiq-` from variable names. Projects not using Sass modules can still @import '<path>/sass-true/sass/true' and access the setting as $true-terminal-output TODO
- FEATURE: Added \_index.scss at the project root, for simpler import path: @use '<path>/sass-yiq'
- INTERNAL: Remove Grunt(!)
- INTERNAL: Update dev dependencies and package manager
