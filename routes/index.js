const locationRoutes = require('./location');

const constructorMethod = app => {
    app.use("/", locationRoutes);
  
    app.use("*", (req, res) => {
      res.status(404).render("pages/error404", {title: "404 Not Found"});
    });
};

module.exports = constructorMethod;
