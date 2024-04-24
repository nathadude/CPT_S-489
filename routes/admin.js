var express = require('express');
var router = express.Router();
const User = require('../model/User');

router.get('/:username', async function(req, res, next) {
    const user = await User.getUser(req.session.user.username);
    if (user.admin === true) {
        const users = await User.getUsers();
        res.render('admin', { user, users } );
    }
    else {
        res.redirect('/home/?msg=notadmin');
    }
});

router.post('/:username/deleteUser', async function(req, res, next) {
    try {
        await User.destroy({
            where: {
                username: req.body.uname
            }
        });
        res.redirect('/admin/' + req.params.username + '?msg=deleteduser');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/' + req.params.username + '?msg=deleteusererror');
    }
})
  
  module.exports = router;