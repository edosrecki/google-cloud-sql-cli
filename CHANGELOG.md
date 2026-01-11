## [3.0.1](https://github.com/edosrecki/google-cloud-sql-cli/compare/v3.0.0...v3.0.1) (2026-01-11)


### Bug Fixes

* pkg output file name ([8233da3](https://github.com/edosrecki/google-cloud-sql-cli/commit/8233da358320e4fd11873fc208250e76503928c6))

# [3.0.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v2.0.0...v3.0.0) (2026-01-11)


* chore!: move to ESM, pnpm ([0c96f8f](https://github.com/edosrecki/google-cloud-sql-cli/commit/0c96f8f988bbd438815df76ee744b9b1e8c518c1))


### BREAKING CHANGES

* Not a breaking change, source in ESM, but
still compiles to CJS. However, releasing as major version
due to potential for failures because of a new build process.

# [2.0.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.10.0...v2.0.0) (2026-01-10)


* feat!(alloyDB): add alloyDB ([3653ce2](https://github.com/edosrecki/google-cloud-sql-cli/commit/3653ce2311d3ae24b1dfea8ada5aab88b3a3af5a))


### BREAKING CHANGES

* Configuration file format changes in order to support
both Cloud SQL and AlloyDB instances. Migration from v1 to v2 should
be automatic on the first run of the v2 of the CLI.

Relates SUITEDEV-39317

# [1.10.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.9.4...v1.10.0) (2025-05-20)


### Features

* upgrade to cloud sql auth proxy v2 ([3cc42eb](https://github.com/edosrecki/google-cloud-sql-cli/commit/3cc42eb5b34d176794da3c31bd7114ba459ebf5b))

## [1.9.4](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.9.3...v1.9.4) (2024-11-18)

## [1.9.3](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.9.2...v1.9.3) (2024-01-15)

## [1.9.2](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.9.1...v1.9.2) (2023-11-15)

## [1.9.1](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.9.0...v1.9.1) (2023-10-03)

# [1.9.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.8.2...v1.9.0) (2023-08-15)


### Features

* increase pod wait timeout to 5min ([b80736c](https://github.com/edosrecki/google-cloud-sql-cli/commit/b80736c486d28eaf1ce32c10de3b227b2a8054d8))

## [1.8.2](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.8.1...v1.8.2) (2023-07-24)

## [1.8.1](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.8.0...v1.8.1) (2023-01-11)


### Bug Fixes

* kebab case pod name on kubectl run ([e5253fe](https://github.com/edosrecki/google-cloud-sql-cli/commit/e5253fe3c7a0227d1323161255ea36c02a6ca672))

# [1.8.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.7.5...v1.8.0) (2022-11-11)


### Features

* support IAM login ([e8dcf6d](https://github.com/edosrecki/google-cloud-sql-cli/commit/e8dcf6d796984049e2a3b6a44b1ef458dd538c48))

## [1.7.5](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.7.4...v1.7.5) (2022-11-04)


### Bug Fixes

* **release:** update package.json version ([64c349a](https://github.com/edosrecki/google-cloud-sql-cli/commit/64c349aaeb48645d114e71c531ccfd8bb860cc02))

## [1.7.4](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.7.3...v1.7.4) (2022-11-04)

## [1.7.3](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.7.2...v1.7.3) (2022-11-04)

## [1.7.2](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.7.1...v1.7.2) (2022-11-04)

## [1.7.1](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.7.0...v1.7.1) (2022-05-18)


### Bug Fixes

* service-account flag removed in latest kubectl ([1be49fd](https://github.com/edosrecki/google-cloud-sql-cli/commit/1be49fd859d9ca472b58f582080e49be762e0374))

# [1.7.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.6.1...v1.7.0) (2022-01-31)


### Features

* add update notifier ([7be885c](https://github.com/edosrecki/google-cloud-sql-cli/commit/7be885cbc80da6ee529187c36d586ef6e7075b5c))

## [1.6.1](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.6.0...v1.6.1) (2022-01-31)


### Bug Fixes

* **npm:** add .npmignore ([63405a4](https://github.com/edosrecki/google-cloud-sql-cli/commit/63405a4368dde9ea85a3637fb0d59eb258926699))

# [1.6.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.5.4...v1.6.0) (2022-01-31)


### Bug Fixes

* release from master branch ([9e63d7f](https://github.com/edosrecki/google-cloud-sql-cli/commit/9e63d7f8490c9b275b051de1de8a6091ca13e53a))


### Features

* add safe-to-evict pod annotation ([904fa26](https://github.com/edosrecki/google-cloud-sql-cli/commit/904fa26c4f5aaa380902ca66c1658225bc723f06))

## [1.5.4](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.5.3...v1.5.4) (2022-01-31)


### Bug Fixes

* deploy new GitHub Release ([b4d9c94](https://github.com/edosrecki/google-cloud-sql-cli/commit/b4d9c94fa92c1aa8cb0a4b67b4d8ec73d4c332e7))

## [1.5.3](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.5.2...v1.5.3) (2022-01-26)


### Bug Fixes

* add shebang to index file ([40ddc86](https://github.com/edosrecki/google-cloud-sql-cli/commit/40ddc86a4c167e76e8dee294d71cd10d23ab0605))

## [1.5.2](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.5.1...v1.5.2) (2022-01-26)

## [1.5.1](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.5.0...v1.5.1) (2022-01-25)


### Bug Fixes

* configurations run fails ([6c7d84f](https://github.com/edosrecki/google-cloud-sql-cli/commit/6c7d84fb02580d287892a308ab32fce8af5e00e5))
* throw error if cmd return code not 0 ([79ec7f9](https://github.com/edosrecki/google-cloud-sql-cli/commit/79ec7f9a70748e7fe07b577d583fb7c399bc010a))

# [1.5.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.4.0...v1.5.0) (2022-01-25)


### Features

* print command errors to user ([7f11505](https://github.com/edosrecki/google-cloud-sql-cli/commit/7f11505c13ce9a89bbc790e571748e3d51b25271))

# [1.4.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.3.0...v1.4.0) (2022-01-24)


### Features

* add non-interactive run command ([0edb68d](https://github.com/edosrecki/google-cloud-sql-cli/commit/0edb68db764604b02e235fc7c19c568a0d0c942d))

# [1.3.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.2.0...v1.3.0) (2022-01-23)


### Features

* alias create command as edit ([a6052f7](https://github.com/edosrecki/google-cloud-sql-cli/commit/a6052f7be500769211bf7c615398dfe4f87bdf6d))

# [1.2.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.1.1...v1.2.0) (2022-01-23)


### Features

* support kubectl contexts ([753f711](https://github.com/edosrecki/google-cloud-sql-cli/commit/753f711d7087482141155b976ebf23fa5656793f))

## [1.1.1](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.1.0...v1.1.1) (2022-01-23)


### Bug Fixes

* brew formula ([3f49f8d](https://github.com/edosrecki/google-cloud-sql-cli/commit/3f49f8d6e8f53d6e6e2143c76339c1f2e6761004))

# [1.1.0](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.0.2...v1.1.0) (2022-01-23)


### Features

* support MySQL and SQL Server ([7ff7359](https://github.com/edosrecki/google-cloud-sql-cli/commit/7ff73599ce5ccf55232e1c32891d71a7b0232c79))

## [1.0.2](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.0.1...v1.0.2) (2022-01-23)


### Bug Fixes

* homebrew formula description ([d94f74f](https://github.com/edosrecki/google-cloud-sql-cli/commit/d94f74fd49774e8bd67c72fa96b515cd902eaf7b))

## [1.0.1](https://github.com/edosrecki/google-cloud-sql-cli/compare/v1.0.0...v1.0.1) (2022-01-23)


### Bug Fixes

* homebrew deployment ([9ff5b2a](https://github.com/edosrecki/google-cloud-sql-cli/commit/9ff5b2a38426bc1d92ffa236078365242f3d46a7))

# 1.0.0 (2022-01-23)


### Features

* add semantic release ([bb600da](https://github.com/edosrecki/google-cloud-sql-cli/commit/bb600da2862e52ebdca924febf0955bdfb9afffc))
* initial version of google-cloud-sql CLI app ([f7cd542](https://github.com/edosrecki/google-cloud-sql-cli/commit/f7cd542446cd856f7deb7f7d3fba96c371cc6989))
