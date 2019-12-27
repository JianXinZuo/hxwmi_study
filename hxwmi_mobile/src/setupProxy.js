const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    // console.log(app);
    app.use(
        proxy("/api", {
            // target: "http://jsonplaceholder.typicode.com/",
            target: "http://brace.wm319.com/",
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
            pathRewrite: {
              "^/api": ""
            }
        })
    );
};