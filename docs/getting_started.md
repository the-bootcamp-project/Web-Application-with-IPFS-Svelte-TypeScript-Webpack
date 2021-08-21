# Getting Started

Here we log our developtment expirisence.

## Install the Development Enviroument

You need to [install Docker on your development](https://www.docker.com/get-started) mashine.

We use [VS Code](https://code.visualstudio.com/) by default!

Install the following Extension, localy:

- [ ] [ms-azuretools.vscode-docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [ ] [ms-vscode-remote.remote-containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Create a new folder on your local storage and call them `.devcontainer` in them you create a file called `devcontainer.json`

Copy the example below in the `devcontainer.json`

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the README at:
// https://github.com/microsoft/vscode-dev-containers/tree/v0.158.0/containers/docker-existing-dockerfile
{
    "name": "Web Application Bootcamp",

    // Sets the run context to one level up instead of the .devcontainer folder.
    "context": "../",

    // Update the 'dockerFile' property if you aren't using the standard 'Dockerfile' filename.
    "dockerFile": "../Dockerfile",

    // Set *default* container specific settings.json values on container create.
    "settings": {},

    // Add the IDs of extensions you want installed when the container is created.
    "extensions": [
      "eamodio.gitlens",
      "codezombiech.gitignore",
      "yzhang.markdown-all-in-one",
      "davidanson.vscode-markdownlint",
      "gruntfuggly.todo-tree",
      "wayou.vscode-todo-highlight",
      "ms-azuretools.vscode-docker",
      "svelte.svelte-vscode"
    ],

    // Use 'forwardPorts' to make a list of ports inside the container available locally.
    // "forwardPorts": [],

    // Uncomment the next line to run commands after the container is created - for example installing curl.
    // "postCreateCommand": "apt-get update && apt-get install -y curl",

    // Uncomment when using a ptrace-based debugger like C++, Go, and Rust
    // "runArgs": [ "--cap-add=SYS_PTRACE", "--security-opt", "seccomp=unconfined" ],

    // Uncomment to use the Docker CLI from inside the container. See https://aka.ms/vscode-remote/samples/docker-from-docker.
    // "mounts": [ "source=/var/run/docker.sock,target=/var/run/docker.sock,type=bind" ],

    // Uncomment to connect as a non-root user if you've added one. See https://aka.ms/vscode-remote/containers/non-root.
    "remoteUser": "bootcamp"
    // "workspaceFolder": "/workspaces/browser-extension/project"
}
```

create a `Dockerfile` in the parent folder of `.devcontainer` with this content.

```dockerfile
FROM tbcp/nodejs:debian

USER bootcamp

WORKDIR /home/bootcamp/
```

Not really much going on at this point, but on our development path this `dockerfile` will continue to expand and will end up being our complete runtime environment.

Now our Project Folder shoud look like this:

- .devcontainer
  - devcontainer.json
- Dockerfile

If this is the case and you have installed the VS Code Extensions, you see a small green icon in the left buttom corner of your VS Code. ![vscode_remote_window](_media/vscode_remote_window.PNG)

Press it and select `Reopen in Container`

So, now we are in our development environment. Let's start the development!
