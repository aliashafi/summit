import React from 'react'

const CommentItem = ({ comment, user, currentUser, removeComment}) => {
    
    return (
        <div id="comment-item">
            <div className="profile-picture-small-comment">
                <img src={user.photoUrl} alt=""/>
             </div>

            <div>
                <h3>{user.first_name} {user.last_name}</h3>
                <p>{comment.body}</p>
            </div>

            {currentUser.id === user.id ? 
                <p id="delete-comment" onClick={() => removeComment(comment.id)}>
                    <img id="x" src={window.images.x} alt=""/>
                </p> : ""
            }
           
        </div>
    )
}

export default CommentItem