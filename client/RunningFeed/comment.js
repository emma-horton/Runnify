import { updateRun } from './card.js';

function createComment(text, author) {
    let commentElement = document.createElement("div");
    commentElement.className = "comment";

    let commentText = document.createElement("p");
    commentText.textContent = text;

    let commentAuthor = document.createElement("span");
    commentAuthor.textContent = author;

    commentElement.appendChild(commentText);
    commentElement.appendChild(commentAuthor);

    return commentElement;
}

export default function createCommentsPopup(card, commentsData, cardId, currentUser) {
    // console.log(currentUser);
    
    let commentsPopup = document.createElement("div");
    commentsPopup.className = "comments-popup";

    let commentsContent = document.createElement("div");
    commentsContent.className = "comments-content";

    // add existing comments
    commentsData.forEach(function (comment) {
        let commentElement = createComment(comment.text, comment.author);
        commentsContent.appendChild(commentElement);
    });

    let commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Write a comment...";
    commentInput.className = "comment-input";

    let sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.className = "send-button";

    sendButton.addEventListener('click', function () {
        let commentText = commentInput.value;
        if (commentText !== "") {
            let newComment = { text: commentText, author: currentUser };
            // add to the start
            commentsData.unshift(newComment);

            let commentElement = createComment(newComment.text, newComment.author);
            commentsContent.insertBefore(commentElement, commentsContent.firstChild);
            commentInput.value = "";  // clean the input field

            // update comment count locally
            let commentsCountElement = card.querySelector('.comments_text');
            let currentCommentsCount = parseInt(commentsCountElement.textContent);
            commentsCountElement.textContent = currentCommentsCount + 1;

            // update comment
            updateRun(cardId, null, null, commentsData);
        }
    });

    commentsPopup.appendChild(commentsContent);
    commentsPopup.appendChild(commentInput);
    commentsPopup.appendChild(sendButton);

    return commentsPopup;
}
