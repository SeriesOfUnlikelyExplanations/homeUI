module.exports = function(app){
  app.get("/home", (req, res) => {
    res.status(200).render("PrivacyPolicy");
  });

  app.use('/home/comps', require('./getComps'));
}
