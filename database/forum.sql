    CREATE TABLE IF NOT EXISTS USERS (
        email PRIMARY KEY TEXT NOT NULL, 
        username TEXT NOT NULL, 
        password TEXT NOT NULL, 
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        premium INT NOT NULL,
        admin INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS DISCUSSION_TOPICS (
        topicID INT PRIMARY KEY AUTOINCREMENT NOT NULL, 
        email TEXT NOT NULL, -- grab the email which is the unique primary key in users table to display username on posts, comments, etc.
        topicName TEXT NOT NULL, 
        topicDesc TEXT NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,  
        FOREIGN KEY (email) REFERENCES USERS(email)
    );
 
    CREATE TABLE IF NOT EXISTS POSTS (
        postID INT PRIMARY KEY AUTOINCREMENT NOT NULL,
        email TEXT NOT NULL,  
        topicID INT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        votes INT DEFAULT 0 CHECK(votes >= 0), -- default votes to 0, makes sure it can't be less than 0, then decrement or increment based on upvote or downvote
        FOREIGN KEY (email) REFERENCES USERS(email),
        FOREIGN KEY (topicID) REFERENCES DISCUSSION_TOPICS(topicID)
    );

    CREATE TABLE IF NOT EXISTS COMMENTS (
        commentID INT PRIMARY KEY,
        email TEXT NOT NULL,
        postID INT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (email) REFERENCES USERS(email),
        FOREIGN KEY (postID) REFERENCES POSTS(postID)
    );

    -- CREATE TABLE IF NOT EXISTS VOTES(
    --     voteID INT PRIMARY KEY AUTOINCREMENT NOT NULL,
    --     email TEXT NOT NULL,
    --     postID INT NOT NULL,
    --     inc INT,
    --     created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    --     CHECK (inc IN (-1, 1)),
    --     FOREIGN KEY (email) REFERENCES USERS(email),
    --     FOREIGN KEY (postID) REFERENCES POSTS(postID)
    -- );

