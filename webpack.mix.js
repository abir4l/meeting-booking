const mix = require("laravel-mix");
const path = require("path");
const tailwindCss = require("tailwindcss");

mix.js("assets/js/app.js", "dist/js").version();

mix.sass("assets/scss/app.scss", "dist/css").options({
    processCssUrls: false,
    postCss: [tailwindCss("assets/js/tailwind.config.js")]
});
