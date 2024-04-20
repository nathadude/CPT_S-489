    CREATE TABLE IF NOT EXISTS USERS (
        username TEXT PRIMARY KEY NOT NULL, 
        password TEXT NOT NULL, 
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        premium INTEGER NOT NULL,
        admin INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS DISCUSSION_TOPICS (
        topicID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        username TEXT NOT NULL, -- grab the username which is the unique primary key in users table to display username on posts, comments, etc.
        topicName TEXT NOT NULL, 
        topicDesc TEXT NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,  
        FOREIGN KEY (username) REFERENCES USERS(username)
    );
 
    CREATE TABLE IF NOT EXISTS POSTS (
        postID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        username TEXT NOT NULL,  
        topicID INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        votes INTEGER DEFAULT 0 CHECK(votes >= 0), -- default votes to 0, makes sure it can't be less than 0, then decrement or increment based on upvote or downvote
        FOREIGN KEY (username) REFERENCES USERS(username),
        FOREIGN KEY (topicID) REFERENCES DISCUSSION_TOPICS(topicID)
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
    CREATE TABLE IF NOT EXISTS TOPIC_MEMBERS (
        memberID INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        topicID INTEGER NOT NULL,
        FOREIGN KEY (username) REFERENCES USERS(username),
        FOREIGN KEY (topicID) REFERENCES DISCUSSION_TOPICS(topicID)
    );

    -- CREATE TABLE IF NOT EXISTS VOTES(
    --     voteID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    --     username TEXT NOT NULL,
    --     postID INTEGER NOT NULL,
    --     inc INTEGER,
    --     created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    --     CHECK (inc IN (-1, 1)),
    --     FOREIGN KEY (username) REFERENCES USERS(username),
    --     FOREIGN KEY (postID) REFERENCES POSTS(postID)
    -- );

