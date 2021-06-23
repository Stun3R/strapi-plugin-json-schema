![strapi-plugin-sdk-bridge](./public/assets/preview.png)
# Strapi - SDK Bridge plugin

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Bridge for the [Strapi SDK JS](https://strapi-sdk-js.netlify.app) package CLI to generate types based on your  API content types.

- [✨ &nbsp;Release Notes](https://github.com/stun3r/strapi-plugin-sdk-bridge/releases)

## How it works?

1. Generate JSON schema based on your Strapi content types
2. Aggregate the list of content type with they kind (collection | single) in an array
3. The Strapi SDK will trigger this plugin in order to generate lot of usefull things (Typescript Types, shortcuts methods)

## Getting started

### ⏳ Installation

You have to install this plugin within your Strapi project thanks [**yarn**](https://classic.yarnpkg.com/en/docs/install/):
```bash
yarn add strapi-generate-types
```

After successful installation you've to build a fresh package that includes  plugin UI. To archive that simply use:

```bash
yarn build
yarn develop
```

or just run Strapi in the development mode with `--watch-admin` option:

```bash
yarn develop --watch-admin
```

The **SDK Bridge** plugin should appear in the **Plugins** section of Strapi sidebar after you run app again.

Enjoy 🎉

### 🖐 Requirements

Complete installation requirements are exact same as for Strapi itself and can be found in the documentation under <a href="https://strapi.io/documentation/v3.x/installation/cli.html#step-1-make-sure-requirements-are-met">Installation Requirements</a>.

**Supported Strapi versions**:

- Strapi v3.6.0 (recently tested)
- Strapi v3.x

(This plugin may work with the older Strapi versions, but these are not tested nor officially supported at this time.)

**We recommend always using the latest version of Strapi to start your new projects**.

### 🕹 Usage

In order to use it, you have to install [Strapi SDK JS](https://strapi-sdk-js.netlify.app) on your frontend application:
```bash
yarn add strapi-sdk-js
```
**or**
```bash
npm install --save strapi-sdk-js
```

Then you'll have to go to your [admin panel](http://localhost:1337/admin/plugins/sdk-bridge) in order to copy your JWT token & paste in a `.env` file inside your frontend application.

After this step, you'll have to go inside your frontend application and use the CLI, as bellow:
```bash
yarn strapi-sdk-js generate
```
**or**
```bash
npx strapi-sdk-js generate
```

The prompt will ask your **strapi host** (default: `http://localhost:1337`) and generate the Typescript's types & content Type JSON in a `models` folder

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/strapi-plugin-sdk-bridge/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/strapi-plugin-sdk-bridge

[npm-downloads-src]: https://img.shields.io/npm/dt/strapi-plugin-sdk-bridge.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/strapi-plugin-sdk-bridge

[license-src]: https://img.shields.io/npm/l/strapi-plugin-sdk-bridge.svg?style=flat-square
[license-href]: ./LICENSE