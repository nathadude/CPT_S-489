    CREATE TABLE IF NOT EXISTS USERS (
        username TEXT PRIMARY KEY NOT NULL, 
        password TEXT NOT NULL, 
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        premium INTEGER NOT NULL,
        admin INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Forum (
        forumID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        username TEXT NOT NULL, -- grab the username which is the unique primary key in users table to display username on posts, comments, etc.
        forumName TEXT NOT NULL, 
        forumDesc TEXT NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,  
        FOREIGN KEY (username) REFERENCES USERS(username)
    );
 
    CREATE TABLE IF NOT EXISTS POSTS (
        postID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        username TEXT NOT NULL,  
        forumID INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        votes INTEGER DEFAULT 0 CHECK(votes >= 0), -- default votes to 0, makes sure it can't be less than 0, then decrement or increment based on upvote or downvote
        FOREIGN KEY (username) REFERENCES USERS(username),
        FOREIGN KEY (forumID) REFERENCES FORUM(forumID)
    );

    CREATE TABLE IF NOT EXISTS COMMENTS (
        commentID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        username TEXT NOT NULL,
        postID INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (username) REFERENCES USERS(username),
        FOREIGN KEY (postID) REFERENCES POSTS(postID)
    );

    -- Table for users to join a topic discussion/community
    CREATE TABLE IF NOT EXISTS FORUM_MEMBERS (
        forumMemberID INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        forumID INTEGER NOT NULL,
        FOREIGN KEY (username) REFERENCES USERS(username),
        FOREIGN KEY (forumID) REFERENCES FORUM(forumID)
    );


