# CLAUDE.md

Working notes for `@timhettler/sass-yiq` — a small, **pure-Sass** library for YIQ-based color contrast (`is-light`, `contrast-color`, `contrasted`), published as a public scoped npm package. What ships **is the Sass source** — there is no build/compile step for the published artifact.

## Environment (read first — the non-obvious part)

- **Use Node 22+.** `package.json` `engines` says `>=18`, but that's misleading: the Sass **CLI** (`yarn generate`) crashes on Node 18 with `ERR_REQUIRE_ESM` (sass's CLI `require()`s an ESM-only `chokidar`). CI pins Node 22. `yarn test` happens to work on 18 (it uses the Sass JS API, not the CLI) — but just use 22 for everything.
- **Package manager is Yarn 4 (Berry)**, pinned via `.yarnrc.yml` `yarnPath` → a committed release in `.yarn/releases/`. Any `yarn` call delegates to it automatically, so you do **not** need `corepack enable` (that's why CI has no such step). `nodeLinker: node-modules`.
- Editing `package.json` dependencies — **including `peerDependencies`** — changes `yarn.lock` (the root workspace entry records the peer range). Run a plain `yarn install` afterward and commit the lockfile, or CI's `yarn install --immutable` will fail.

## Layout

- `_index.scss` — package entry (`@use '@timhettler/sass-yiq'`); forwards `sass/config` + `sass/module`.
- `sass/module/_module.scss` — the API: `is-light()`, `contrast-color()`, `contrasted()`.
- `sass/config/_settings.scss` — configurable `!default`s (`$contrasted-dark-default`, `$contrasted-light-default`, `$contrasted-threshold`, `$debug`).
- `sass/_yiq.import.scss` — legacy `@import` shim exposing the old `yiq-`-prefixed names.
- `test/test.scss` — sass-true tests, run by `mocha` via `test/sass.test.js`.
- `demo/styles/demo.scss` — demo, compiled by `yarn generate`.
- `docs/` + the `gh-pages` branch — a **static SassDoc snapshot**, NOT auto-regenerated (sassdoc was dropped as unmaintained). The real API reference is the `///` doc comments in `sass/`.

## Verifying a change

```bash
yarn install --immutable   # what CI runs
yarn lint                  # stylelint --fix on **/*.scss
yarn test                  # mocha + sass-true (is-light / contrast-color / contrasted)
yarn generate              # compiles the demo; MUST print zero deprecation warnings
```

- **Zero Dart Sass deprecation warnings from `yarn generate` is the health signal** for the source. If Sass deprecates more APIs later, that's where it shows up first.
- `yarn prettier` has `--write` **hardcoded** over `**/*.{json,md,yml}`. Don't pass it file args expecting a `--check` — it will reformat whatever matches (it once clobbered `docs/search-data.json`). Repo JSON/MD is already prettier-formatted.
- The tracked `demo/styles/demo.css` can differ from a fresh `yarn generate` purely due to Sass-version formatting (`:after`↔`::after`, hex shortening). Don't commit that churn unless the demo source actually changed.

## Releasing (fully automated)

1. In the PR: bump `version` in `package.json`, and add a CHANGELOG entry with the **exact header** `## X.Y.Z (MM/DD/YY)` — the workflow parses releases by that `## <version>` header.
2. Merge to `master`.
3. Tag and push:
   ```bash
   git tag vX.Y.Z && git push origin vX.Y.Z
   ```
4. `.github/workflows/publish.yml` (trigger: `push` tag `v*`) then, in one job: verifies the tag matches `package.json` `version`, extracts the matching CHANGELOG section, runs `yarn npm publish --access public --tolerate-republish`, and creates/updates the GitHub Release using that CHANGELOG section as the body. It's idempotent — safe to re-run or re-push a tag.

**The thing most likely to be broken years from now: the `NPM_TOKEN` repo secret.** It's an npm **granular access token** (read+write on the package; bypasses 2FA) **with an expiration**. If a publish run fails on auth, the token has lapsed — regenerate it at npmjs.com (Access Tokens → Granular, scoped to this package) and update the secret via `gh secret set NPM_TOKEN`. (No npm provenance yet; adding it would mean `npm publish --provenance` + `id-token: write`.)

## Gotchas (learned the hard way)

- **A tag-triggered publish needs `publish.yml` present on the tagged commit.** The tag must point to a `master` commit that already contains the workflow. Tagging a commit that predates it does nothing.
- **Stacked PRs don't auto-retarget unless the base branch is deleted.** A PR based on a non-`master` branch, merged while that base still exists, lands on the *stale base* — not `master`. If you stack PRs, delete each base branch immediately after it merges (or retarget dependents to `master` by hand). This bit us once (the publish workflow merged into a stale branch and had to be re-landed).
- **Stay on non-deprecated Dart Sass APIs.** v3 migrated the source to `color.channel($c, "red"|"lightness", $space: rgb|hsl)` (requires Sass ≥1.79) instead of the removed `color.red()`/`color.lightness()`, and to `@if`/`@else` instead of the deprecated `if()` function. Note `color.channel(..., "lightness", $space: hsl)` preserves the `%` unit, so it's a behavior-preserving swap.
- **Dependabot watches both `npm` and `github-actions`** (`.github/dependabot.yml`), so dependency and Action-version bumps arrive as PRs automatically.
