var express = require('express');
var router = express.Router();
const User = require('../model/User');
const Forum = require('../model/Forum');
const ForumMembers = require('../model/ForumMembers');
const Post = require('../model/Post');

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
  // gets trending posts
  const posts = await Post.getTrendingPost();
  let forumNames = [];
  for (post of posts) {
    const forum = await Forum.getForum(post.forumID);
    forumNames.push([forum.forumID, forum.forumName]);
  }
  res.render('home', { forums, posts, forumNames});

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

router.post("/upvote", async function(req, res, next) {
  try {
    await Post.upvote(req.body.postID);
    res.redirect('/home?msg=upvotesuccess');
  } catch (error) {
    res.redirect('/home?upvotemsg='+new URLSearchParams(error.toString()).toString());
  }
});

router.post("/downvote", async function(req, res, next) {
  try {
    await Post.downvote(req.body.postID);
    res.redirect('/home?msg=downvotesuccess');
  } catch (error) {
    res.redirect('/home?downvotemsg='+new URLSearchParams(error.toString()).toString());
  }
});

router.get('/:forumID', async function(req, res, next) {
  const forum = await Forum.getForum(req.params.forumID);
  if (forum) {
    const isMember = await ForumMembers.isMember(req.session.user.username, req.params.forumID);
    const posts = await Post.getForumPost(forum.forumID);
    res.render('forum', { forum, isMember, posts });
  } else {
    res.redirect('/home/?msg=forum+not+found&?forumid='+req.params.forumID);
  }
});

router.post("/:forumID/joinForum", async function(req, res, next) {
  const forumID = req.params.forumID;
  const username = req.session.user.username;

  try {
      // Check if the user is already a member of the forum
      const isMember = await ForumMembers.isMember(username, forumID);

      if (!isMember) {
          // User is not a member, so join the forum
          await ForumMembers.create({
            username: username,
            forumID: forumID
          });
          res.redirect('/home/' + forumID + '?msg=joinedforum');
      } else {
          // User is already a member, handle accordingly (e.g., show a message)
          res.redirect('/home/' + forumID + '?msg=alreadymember');
      }
  } catch (error) {
      // Handle errors (e.g., database errors)
      console.error(error);
      res.redirect('/home/' + forumID + '?msg=error');
  }
});

router.post("/:forumID/leaveForum", async function(req, res, next) {
  const forumID = req.params.forumID;
  const username = req.session.user.username;

  try {
      // Check if the user is already a member of the forum
      const isMember = await ForumMembers.isMember(username, forumID);

      if (isMember) {
          // User is not a member, so leave the forum
          await ForumMembers.destroy({
            where: {
              username: username,
              forumID: forumID
            }
          })
          res.redirect('/home/' + forumID + '?msg=leftforum');
      } else {
          // User is already a member, handle accordingly (e.g., show a message)
          res.redirect('/home/' + forumID + '?msg=alreadynotmember');
      }
  } catch (error) {
      // Handle errors (e.g., database errors)
      console.error(error);
      res.redirect('/home/' + forumID + '?msg=error');
  }
});

router.get('/:forumID/:postID', async function(req, res, next) {
  const post = await Post.getPost(req.params.postID);
  if (post) {
    res.render('discussion', { post });
  } else {
    res.redirect('/home/?msg=post+not+found&?postid='+req.params.postID);
  }
});


module.exports = router;
