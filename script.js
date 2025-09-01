// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle comment form submission
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const textarea = this.querySelector('textarea');
            const commentText = textarea.value.trim();
            
            if (commentText) {
                addComment(commentText);
                textarea.value = ''; // Clear the textarea
            }
        });
    }
    
    // Social sharing buttons
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`Sharing via ${this.textContent} would normally open a share dialog.`);
        });
    });
    
    // Lazy loading for images (could be expanded with actual lazy loading library)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            imageLoaded(img);
        } else {
            img.addEventListener('load', function() {
                imageLoaded(this);
            });
        }
    });
    
    // Add some sample comments
    addSampleComments();
});

// Function to add a new comment
function addComment(text) {
    const commentList = document.querySelector('.comment-list');
    if (!commentList) return;
    
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    
    const now = new Date();
    const dateString = now.toLocaleDateString() + ' at ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    commentDiv.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">You</span>
            <span class="comment-date">${dateString}</span>
        </div>
        <div class="comment-body">${escapeHtml(text)}</div>
    `;
    
    commentList.prepend(commentDiv);
}

// Function to add some sample comments
function addSampleComments() {
    const comments = [
        {
            author: "Alex Rivera",
            date: "June 16, 2023 at 09:23",
            text: "Great article! I've been using CSS Grid more frequently and it's revolutionized my workflow."
        },
        {
            author: "Maya Chen",
            date: "June 15, 2023 at 17:45",
            text: "I'd love to see more examples of AI-powered responsiveness. Are there any frameworks you'd recommend exploring?"
        }
    ];
    
    const commentList = document.querySelector('.comment-list');
    if (!commentList) return;
    
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        
        commentDiv.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${escapeHtml(comment.author)}</span>
                <span class="comment-date">${escapeHtml(comment.date)}</span>
            </div>
            <div class="comment-body">${escapeHtml(comment.text)}</div>
        `;
        
        commentList.appendChild(commentDiv);
    });
}

// Function to handle image loading
function imageLoaded(img) {
    img.style.opacity = 1;
}

// Utility function to escape HTML (prevent XSS)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}