var express = require('express');
var router = express.Router();
const User = require('../model/User');

/* GET the index page. */
router.get('/', async function(req, res, next) {
  const user = await User.findUser("josh", "1234");
  if (user !== null) {
    req.session.user = user;
    res.redirect("/home");
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
