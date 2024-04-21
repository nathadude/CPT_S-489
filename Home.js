function createDiscussion() {
    // Prompt the user for the new discussion title
    var newDiscussionTitle = prompt("Enter the title of the new discussion:");
    if (newDiscussionTitle) { // If the user entered a title
      // Prompt the user for the forum name
      var forumName = prompt("Enter the name of the forum for the new discussion:");
      if (forumName) { // If the user entered a forum name
        // Create a new discussion element
        var newDiscussion = document.createElement("a");
        newDiscussion.setAttribute("id", "discussion-link");
        newDiscussion.setAttribute("href", "./Discussion.html");
        newDiscussion.setAttribute("role", "menuitem");
        newDiscussion.innerHTML = `
          <div class="discussion">
            <div class="row">
              <div class="col-1 d-flex align-items-center justify-content-center">
                <div class="profile-picture">
                  <span>P1</span>
                </div>
              </div>
              <div class="col-10">
                <div class="discussion-header">
                  <h5 class="discussion-title">${newDiscussionTitle}</h5>
                  <p class="discussion-user">User 1 <span class="posted-time">Posted 1 Hour Ago</span></p>
                </div>
              </div>
              <div class="col-1">
                <p class="discussion-forum">${forumName}</p>
              </div>
            </div>
          </div>
        `;
  
        // Append the new discussion to the discussion list
        var discussionList = document.querySelector(".home-content .discussion-list");
        discussionList.appendChild(newDiscussion);
      }
    }
  }
  
  // Add a click event listener to the "Create a Discussion" button
  var createDiscussionButton = document.querySelector(".home-content .create-discussion-button");
  createDiscussionButton.addEventListener("click", createDiscussion);