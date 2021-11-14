// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = async () => {
    return {
        transform: {
            "^.+\\.svelte$": ["svelte-jester", { "preprocess": true }],
            "^.+\\.ts$": "ts-jest",
            "^.+\\.js$": "babel-jest"
        },
        moduleFileExtensions: ["js","ts","svelte"],
        testEnvironment: 'jsdom'
    };
};
