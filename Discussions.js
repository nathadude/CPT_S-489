function sendMessage() {
    // Retrieve the message input value
    var message = document.getElementById("messageInput").value;
  
    // Store the message in the messages array
    messages.push(message);
  
    // Create a new message element and append it to the message container
    var messageElement = document.createElement("div");
    messageElement.classList.add("message", "outgoing");
    messageElement.innerHTML = `<p>${message}</p>`;
    document.querySelector(".message-container").appendChild(messageElement);
  
    // Clear the message input field
    document.getElementById("messageInput").value = "";
  }

  function displayMessages() {
    // Clear the message container
    document.querySelector(".message-container").innerHTML = "";
  
    // Loop through the messages array and display each message
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      var messageElement = document.createElement("div");
      messageElement.classList.add("message", "outgoing");
      messageElement.innerHTML = `<p>${message}</p>`;
      document.querySelector(".message-container").appendChild(messageElement);
    }
  }