module.exports = {
    "env": {
        "browser" : true,
        "es6" : true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2015
    },
    "rules": {
		"no-console": "off",
        "no-mixed-spaces-and-tabs": ["off", false],
        "no-unused-vars": ["off", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        "no-useless-escape": "off",
        "no-extra-boolean-cast": "off",
        "valid-typeof": "off",
        "no-debugger":"off"
    },
    "globals": {
        "Xrm": true,
        "Norbit": true,
        "Type": true,
        "Mscrm": true,
        "XrmServiceToolkit": true, 
        "Process": true,
        "Alert": true,
        "jQuery": true,
        "$": true,
        "angular": true,
        "_": true,
        "moment": true,
        "BE": true,
        "GetGlobalContext": true,
        "ActiveXObject": true
    }
};