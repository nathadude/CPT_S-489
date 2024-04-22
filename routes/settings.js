var express = require('express');
var router = express.Router();
const User = require('../model/User');

/* GET settings page. */
router.get('/:username', async function(req, res, next) {
    const user = await User.getUser(req.params.username);
  res.render('settings', {user}); // Render the settings.ejs file
});

module.exports = router;