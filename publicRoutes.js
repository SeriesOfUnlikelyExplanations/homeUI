module.exports = function(app){
  app.get("/", (req, res) => {
    console.log(req.requestContext);
    var host
    if (req.headers.host.includes('localhost')) {
      host = 'http://' + req.headers.host
    } else {
      host = 'https://' + req.headers.host
    }
    res.status(200).render("index",{host:host});
  });

  app.get("/PrivacyPolicy.html", (req, res) => {
    res.status(200).render("PrivacyPolicy");
  });
}
