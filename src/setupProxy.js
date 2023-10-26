module.exports = (app) => {
  app.use((req, res, next) => {
    if (req.headers.origin) res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    next();
  });
};
