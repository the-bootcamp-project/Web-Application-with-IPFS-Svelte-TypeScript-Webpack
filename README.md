<a href="https://bootcamp-project.com/" target="_blank"><img src="https://bootcamp-project.com/images/logo.png" align="right" height="200" /></a>
<h1 align="center">How to Build and Publish Modern Web Application with Svelte TailwindCSS TypeScript and Webpack</h1>
<div align="center"><img src="https://img.shields.io/badge/Bootcamp-Project-blue?style=for-the-badge" /></div>

## 👉 About 👈

**Minimum Viable Product**: What is what we want?

- [X] Modern Web techniques
  - [X] TypeScript Support
  - [X] Svelte Components
    - [X] Storybook UI Testing and Presentation
  - [X] TailwindCSS Styling
  - [X] with Webpack bundeling
- [X] Smart reload Development
- [X] a Static Application Security Code Analyzing
  - [X] with ESLint (eslint-plugin-security)
- [X] A Test Driven Development approche
  - [X] with Jest
- [X] Automation (CI/CD)
  - [X] Linting / Prettier
  - [X] Testing
  - [X] Building / Packaging
  - [ ] Deployment / Publishing
- [X] a on Board Documentation for our Users

---

## 🚀 Getting Started 🚀

_For more examples, please refer to the [Documentation](https://frameworks.bootcamp-project.com)_

### ✋ Prerequisites ✋

Ensure you have

- [Node.js](https://nodejs.org) 12 or later and
- [Yarn](https://yarnpkg.com) v2 installed

and, install other global dependencies

```bash
sudo npm install -g yarn

sudo yarn global add \
  typescript \
  webpack webpack-cli webpack-bundle-analyzer \
  cross-env concurrently rimraf \
--prefix /usr/local
```

**Get the Boilerplate**

```bash
git clone --depth 1 --branch main \
  https://gitlab.com/the-bootcamp-project/frameworks/web-application.git \
  hello_webapp
```

**Change directory and update all Git-Submodules**

```bash
cd hello_webapp

yarn run git:sub:update
```

**Remove the old repository and create a new one**

```bash
rm -rf .git && git init .
```

**Now it's your's!**

> *Boilerplate for new projects only, as a contributor please scroll down to: 🤝 Contribute 🤝*

## 💪 Installation 💪

Run the following:

- `yarn install` to install dependencies.
- `yarn run git:sub:merge` to update necessary git submodules

*if you want to use npm, replace `yarn ...` with `npm ...`*

See [Installation Documentation](https://frameworks.bootcamp-project.com/#/webapp/install)

## 😏 Development 😏

Run the following:

- `yarn run dev` to start the development server

*if you want to use npm, replace `yarn ...` with `npm ...`*

See [Development Documentation](https://frameworks.bootcamp-project.com/#/webapp/develop)

## 🤓 Linting 🤓

Run the following:

- `yarn run lint` to start read-only linting from js, ts and svelte files.
- `yarn run lint:fix` to start read-write linting, see above and fix warnings/errors.
- `yarn run lint:format` to prettier the source-code

*if you want to use npm, replace `yarn ...` with `npm ...`*

See [Linting Documentation](https://frameworks.bootcamp-project.com/#/webapp/linting)

## 🧐 Testing 🧐

Run the following:

- `yarn run test:unit:coverage` to start unit-testing and show coverage stets
- `yarn run test:unit` to start unit-testing

*if you want to use npm, replace `yarn ...` with `npm ...`*

See [Testing Documentation](https://frameworks.bootcamp-project.com/#/webapp/testing)

## 🤩 Building 🤩

Run the following:

- `yarn run build:stats` (runs linting and fix first) to start building, create build-profile and shown bundling states
- `yarn run build` (runs linting and fix first) to start building

*if you want to use npm, replace `yarn ...` with `npm ...`*

See [Building Documentation](https://frameworks.bootcamp-project.com/#/webapp/building)

## 🥳 Publishing 🥳

Then run the following:

*if you want to use npm, replace `yarn ...` with `npm ...`*

- `yarn run publish` (creates `./public`) copy content from `./build` to `./public` - *GitLab Pages Example*

See [Publishing Documentation](https://frameworks.bootcamp-project.com/#/webapp/publishing)

> Visit "[Hello world!](https://the-bootcamp-project.gitlab.io/frameworks/web-application/)" Example: `https://the-bootcamp-project.gitlab.io/frameworks/web-application/`

## ⭐️ Features ⭐️

- **ES6 / Node.js** and **TypeScript** modules support by default
- [**Svelte** UI Library and **Tailwind CSS**](https://gitlab.com/the-bootcamp-project/libraries/svelte-components) by default
- **Linting and Prettier** with **ESlint and Prettier** by default
- **Unit-Tests** with **Jest**, Coverage with **Istanbul NYC** by default
- [**Security-first production ready configuration**](https://gitlab.com/the-bootcamp-project/libraries/node-configs/-/blob/main/README.md) by default
- **Automatic CI/CD Pipeline** for **GitLab Pages** by default
- [Extensive configuration **documentation**](https://frameworks.bootcamp-project.com/#/webapp/index)

### 😎 Built With 😎

<table>
	<tr>
		<td><a href="https://svelte.dev/" target="_blank"><img src="https://cdr.rtfm.page/logos/programming/svelte.svg" alt="Svelte" width="200"/></a></td>
		<td><a href="https://tailwindcss.com/" target="_blank"><img src="https://cdr.rtfm.page/logos/programming/tailwindcss.svg" alt="Tailwind CSS" width="200"/></a></td>
		<td><a href="https://typescriptlang.org/" target="_blank"><img src="https://cdr.rtfm.page/logos/programming/typescript.svg" alt="TypeScript" width="200"/></a></td>
		<td><a href="https://webpack.js.org/" target="_blank"><img src="https://cdr.rtfm.page/logos/programming/webpack.svg" alt="Webpack" width="200"/></a></td>
	</tr>
	<tr>
		<td><a href="https://babeljs.io/" target="_blank"><img src="https://cdr.rtfm.page/logos/programming/babel.svg" alt="babel" width="200"/></a></td>
		<td><a href="https://eslint.org/" target="_blank"><img src="https://cdr.rtfm.page/logos/programming/eslint.svg" alt="eslint" width="200"/></a></td>
		<td><a href="https://jestjs.io/" target="_blank"><img src="https://cdr.rtfm.page/logos/programming/jest.svg" alt="jest" width="200"/></a></td>
		<td><a href="https://bootcamp-project.com/" target="_blank"><img src="https://bootcamp-project.com/images/logo.png" alt="Bootcamp Config" width="200"/></a></td>
	</tr>
</table>

## 📑 Changelog 📑

See [CHANGELOG](CHANGELOG) for more information.

## 📋 Roadmap 📋

- [IPFS](https://ipfs.io/)
- **Auto-publishing** with **auto-versioning** and support for manual releases

See the [open issues](https://gitlab.com/the-bootcamp-project/frameworks/web-application/-/issues) for a list of proposed features (and known issues).

## 🤝 Contribute 🤝

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please read the [contribution guidelines](docs/_media/code_of_conduct.md) first.

## 📜 License 📜

See [LICENSE](https://frameworks.bootcamp-project.com/#/LICENSE) for more information.

## 💌 Contact 💌

[Bootcamp contributors](https://bootcamp-project.com/) - `contributors` @ `bootcamp-project` .com

## 🏆 Acknowledgements 🏆

Thanks for these awesome resources that were used during the development of the **Bootcamp Project: Modern Application Frameworks**:
