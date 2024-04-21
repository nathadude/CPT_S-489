var express = require('express');
var router = express.Router();
const User = require('../model/User');
const Forum = require('../model/Forum');
const ForumMembers = require('../model/ForumMembers');

const sessionChecker = (req, res, next)=>{
  if(req.session.user){
    res.locals.username = req.session.user.username
    next()
  }else{
    res.redirect("/?msg=raf")
  }
}

router.use(sessionChecker);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // Get all the forums that the user is a member of
  const forumMemberships = await ForumMembers.getUserForums(req.session.user.username);
  // Extract the forum IDs from the forum memberships
  const forumIDs = forumMemberships.map(member => member.forumID);
  // gets the forum from the forum id's
  const forums = await Forum.getForums(forumIDs);
  console.log(forums)
  res.render('home', { forums });

});

router.post("/createForum", async function(req, res, next) {
  try {
    let currentDate = new Date();
    let created_at = currentDate.toLocaleString();
    await Forum.create(
      {
        username: req.session.user.username,
        forumName: req.body.forumName,
        forumDesc: req.body.forumDesc,
        created_at: created_at
      }
    );

    // gets the new Form created
    const newForum = await Forum.getNewCreatedForm(req.session.user.username, created_at);

    // Add the creator of the forum as a forum member
     await ForumMembers.create({
      username: req.session.user.username,
      forumID: newForum.forumID // Access the auto-generated forumID from the created forum
    });

    res.redirect('/home?msg=success&forumName='+req.body.forumName);
  } catch (error) {
    res.redirect('/home?msg='+new URLSearchParams(error.toString()).toString()+'&forumName='+req.body.forumName);
  }
});

router.get('/:forumID', async function(req, res, next) {
  const forum = await Forum.getForum(req.params.forumID);
  if (forum) {
    res.render('forum', { forum });
  } else {
    res.redirect('/home/?msg=forum+not+found&?forumid='+req.params.forumID);
  }
});

module.exports = router;
