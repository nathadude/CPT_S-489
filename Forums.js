// Prompt the user to enter the title of the new discussion
var newCommentTitle = prompt("Enter the title of the new discussion:");

// If the user entered a title, update the "Discussion" section with the new title
if (newCommentTitle && newCommentTitle.trim().length > 0) {
  var discussionDiv = document.querySelector('.discussion');
  discussionDiv.querySelector('.discussion-title').innerText = newCommentTitle;
}

document.getElementById('new-discussion-button').addEventListener('click', function() {
    var newCommentTitle = prompt("Enter the title of the new discussion:");
    var newCommentUser = prompt("Enter the user of the new discussion:");
    var newCommentForum = prompt("Enter the forum of the new discussion:");
    var newCommentBody = prompt("Enter the body of the new discussion:");
    
    if (newCommentTitle && newCommentTitle.trim().length > 0 &&
        newCommentUser && newCommentUser.trim().length > 0 &&
        newCommentForum && newCommentForum.trim().length > 0 &&
        newCommentBody && newCommentBody.trim().length > 0) {
      
      // Update the "Discussion" section with the new title
      var discussionDiv = document.querySelector('.discussion');
      discussionDiv.querySelector('.discussion-title').innerText = newCommentTitle;
      
      // Send the comment to the server
      var request = new XMLHttpRequest();
      request.open("POST", "/api/comments", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          // The comment was successfully posted, so refresh the list of comments
          refreshCommentsList();
        }
      };
      var data = JSON.stringify({ postId: "1", body: newCommentBody });
      request.send(data);
    }
  });
  
  function refreshCommentsList() {
    // Retrieve the list of comments from the server and update the page
    var request = new XMLHttpRequest();
    request.open("GET", "/api/comments?postId=1", true);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var comments = JSON.parse(request.responseText);
        var commentsList = document.getElementById("comments-list");
        commentsList.innerHTML = "";
        for (var i = 0; i < comments.length; i++) {
          var commentDiv = document.createElement("div");
          commentDiv.className = "comment";
          commentDiv.innerHTML = "<p>" + comments[i].body + "</p>";
          commentsList.appendChild(commentDiv);
        }
      }
    };
    request.send();
  }
  
  refreshCommentsList();