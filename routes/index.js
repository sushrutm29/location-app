const locationRoutes = require('./location');
const historyRoutes = require('./history');

const constructorMethod = app => {
    app.use("/", locationRoutes);
    app.use("/history", historyRoutes);
  
    app.use("*", (req, res) => {
      res.status(404).render("pages/error404", {title: "Error 404: Page Not Found"});
    });
};

module.exports = constructorMethod;
