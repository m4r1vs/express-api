module.exports = {
    "env": {
        "browser": false,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
        },
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "linebreak-style": 0,
        "comma-dangle": ["error", {"functions": "ignore"}],
        "max-len": ["error", { "ignoreUrls": true, "ignoreStrings": true, "ignoreTemplateLiterals": true }],
        quotes: 0
    },
    "extends": ["eslint:recommended", "airbnb-base"]
};
