# First Try - Webpack Fundamentals

The first step is to start with Webpack, because Webpack creates our ready-to-use source code.

In this section, we use a very simple and unproductive example to run Webpack. (Later we will further customize the files).

## Initilize Project

First of all, create a new Node Package. For this we use yarn and not npm, because ist faster and better.

Run:

```bash
yarn init -y
```

This creates the `package.json` without the unnecessary wizard. We manually adjust the `package.json` with our necessities right away.

- .devcontainer
  - devcontainer.json
- Dockerfile
- package.json

Copy this Example to the `package.json` and overwrite the hole content. (Explanations will follow later!)

```json
{
  "name": "web-application-tbcp",
  "version": "0.0.1",
  "license": "MIT",
  "private": false,
  "description": "How to Build and Publish a Web Application with IPFS Svelte TypeScript Webpack",
  "keywords": ["How to", "Build", "Publish", "Web", "Application", "IPFS", "Svelte", "TypeScript", "Webpack", "Boilerplate", "Step-by-Step"],
  "author": "Bootcamp contributors <contributors@bootcamp-project.com>",
  "repository": "https://gitlab.com/the-bootcamp-project/boilerplates/web-application.git",
  "contributors": [
    "John Ollhorn <john@ollhorn.de> (https://ollhorn.de)"
  ]
}
```

### The `name` section

The "name" key represents the package name. If you do not intend to publish this project in a node package registry, this name is not so important.

But it should briefly identify the use of the project.

### The `version` section

We start this with the development version `0.0.1`. Later we develop this project semantically, so it is important that you learn more about the conversation of [Semantic Versioning](https://semver.org) by then.

### The `license` section

Our Project will shared under the MIT Licenes. (No SLA, only RTFM! ;))

### The Visibility (`private` section)

Since we do not publish our package in a package registry, we will declare our project as "private": "true".

### The `description` and `keywords` sections

A useful description and a few keywords are good for Google! But not absolutely necessary.

### The `author`, `repository` and `contributors` section

Author, repository and contributor are self-explanatory

so...

## Prepare the Basic Structure

```bash
yarn add --dev webpack webpack-cli webpack-dev-server
```

`package.json`

```json
{

    "scripts": {
        "build": "webpack",
        "watch": "webpack --watch",
        "preview": "webpack serve --open",
        "test": "echo \"Error: no test specified\" && exit 1"
    },

    "devDependencies": {
        "webpack": "^5.51.1",
        "webpack-cli": "^4.8.0",
        "webpack-dev-server": "^4.0.0"
    },

}
```

Create a file named `.gitignore` and exclude the followed folder and files to sync with the remote repository

```text
node_modules
dist
```

## Add minimal Code Sampels

- .devcontainer
  - devcontainer.json
- dist
  - index.html
- src
  - index.js
- .gitignore
- Dockerfile
- package.json
- webpack.config.js

`dist/index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Getting Started</title>
    </head>
   <body>
       <script src="./main.js"></script>
    </body>
</html>
```

`src/index.js`

```javascript
function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Hello webpack';

    return element;
}

document.body.appendChild(component());
```

`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
    mode: 'development',

    entry: './src/index.js',
    output: {
        filename: 'main.js', path: path.resolve(__dirname, 'dist'),
    },
    devServer: { static: './dist' },
};
```

## First run

```bash
yarn run preview
```

```text
yarn run v1.22.11
$ webpack serve --open
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8081/
<i> [webpack-dev-server] Content not from webpack is served from './dist' directory
asset main.js 283 KiB [emitted] (name: main)
runtime modules 27.2 KiB 13 modules
modules by path ./node_modules/ 197 KiB
  modules by path ./node_modules/webpack-dev-server/client/ 50.7 KiB 12 modules
  modules by path ./node_modules/webpack/hot/*.js 4.3 KiB 4 modules
  modules by path ./node_modules/html-entities/lib/*.js 81.3 KiB 4 modules
  modules by path ./node_modules/querystring/*.js 4.51 KiB 3 modules
  modules by path ./node_modules/url/*.js 23.1 KiB
    ./node_modules/url/url.js 22.8 KiB [built] [code generated]
    ./node_modules/url/util.js 314 bytes [built] [code generated]
  ./node_modules/ansi-html/index.js 4.16 KiB [built] [code generated]
  ./node_modules/events/events.js 14.5 KiB [built] [code generated]
  ./node_modules/punycode/punycode.js 14.3 KiB [built] [code generated]
./src/index.js 180 bytes [built] [code generated]
webpack 5.51.1 compiled successfully in 1118 ms
```
