const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
    alias({
        "@components": "src/components",
        "@layouts": "src/layouts",
        "@pages": "src/pages",
        "@utils": "src/utils",
        "@hooks": "src/hooks",
        "@assets": "src/assets",
    })(config);

    return config;
};
