const express = require("express");
const next = require("next");
const {parse} = require("url");
const port = parseInt(process.env.PORT, 10) || 8000;
const app = next({dev: process.env.NODE_ENV !== "production"});
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // use pages/index.js as /blog
    // server.get("/blog", (req, res) => {
    //     return app.render(req, res, "/", req.query);
    // });

    // use pages/post.js as /blog/:id
    server.get("/data/:id", (req, res) => {
        return app.render(
            req,
            res,
            "/data",
            Object.assign(
                {
                    id: req.params.id
                },
                req.query
            )
        );
    });

    // redirect from /post to /blog or /post?id to /blog/:id
    server.get("/data", (req, res) => {
        if (req.query.id) return res.redirect("/data");
        res.redirect(301, `/data/${req.query.id}`);
    });

    // handle each other url
    server.get("*", (req, res) => {
        return handler(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
