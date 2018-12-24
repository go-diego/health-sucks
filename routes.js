const routes = require("next-routes");

module.exports = routes().add({
    name: "data",
    pattern: "/data/:id",
    page: "data"
});
