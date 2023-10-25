module.exports = (app) => {
  app.use((req, res, next) => {
    // const allowedOrigins = [
    //   "http://127.0.0.1:3800",
    //   "http://localhost:3800",
    //   "https://ceisa40-dev.customs.go.id",
    // ];
    // const { origin } = req.headers;
    // console.log("origin", origin);
    // if (allowedOrigins.includes(origin)) {
    //   res.setHeader("Access-Control-Allow-Origin", origin);
    // }
    // res.header("Access-Control-Allow-Origin", "http://localhost:3800");
    if (req.headers.origin) res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    next();
  });
};
