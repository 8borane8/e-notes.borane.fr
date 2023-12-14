const Slick = require("@borane/slick");

Slick.start({
    port: 5001,
    workspace: __dirname,
    development: process.argv.includes("--dev")
});