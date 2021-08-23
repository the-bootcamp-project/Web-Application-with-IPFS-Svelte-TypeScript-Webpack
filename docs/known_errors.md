# Known Errors

## Plugin "security" was conflicted between ".eslintrc" and "../.eslintrc"

```text
bootcamp@38379ca7345a:/workspaces/Browser Extension/view$ yarn run build
yarn run v1.22.11
$ cross-env NODE_ENV=production webpack
/workspaces/Browser Extension/view/node_modules/@eslint/eslintrc/lib/config-array/config-array.js:202
            throw new PluginConflictError(key, [
                  ^
RpcRemoteError: Plugin "security" was conflicted between ".eslintrc" and "../.eslintrc".
    at mergePlugins (/workspaces/Browser Extension/view/node_modules/@eslint/eslintrc/lib/config-array/config-array.js:202:19)
    at createConfig (/workspaces/Browser Extension/view/node_modules/@eslint/eslintrc/lib/config-array/config-array.js:305:9)
    at ConfigArray.extractConfig (/workspaces/Browser Extension/view/node_modules/@eslint/eslintrc/lib/config-array/config-array.js:481:33)
    at FileEnumerator._isIgnoredFile (/workspaces/Browser Extension/view/node_modules/eslint/lib/cli-engine/file-enumerator.js:529:24)
    at FileEnumerator._iterateFilesRecursive (/workspaces/Browser Extension/view/node_modules/eslint/lib/cli-engine/file-enumerator.js:486:38)
    at _iterateFilesRecursive.next (<anonymous>)
    at FileEnumerator.iterateFiles (/workspaces/Browser Extension/view/node_modules/eslint/lib/cli-engine/file-enumerator.js:296:49)
    at iterateFiles.next (<anonymous>)
    at CLIEngine.executeOnFiles (/workspaces/Browser Extension/view/node_modules/eslint/lib/cli-engine/cli-engine.js:771:48)
    at Object.<anonymous> (/workspaces/Browser Extension/view/node_modules/fork-ts-checker-webpack-plugin/lib/eslint-reporter/reporter/EsLintReporter.js:98:53)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

remove:

```typescript
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';


    plugins: [
        ...
        new ForkTsCheckerWebpackPlugin({ eslint: { files: './src/**/*.{ts,js}' } })
    ],
```
