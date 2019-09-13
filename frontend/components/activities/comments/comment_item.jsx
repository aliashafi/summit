import React from 'react'

const CommentItem = ({ comment, user }) => {

    return (
        <div id="comment-item">
            <div className="profile-picture-small-comment">
                <img src={user.photoUrl} alt=""/>
             </div>

            <div>
                <h3>{user.first_name} {user.last_name}</h3>
                <p>{comment.body}</p>
            </div>
           
        </div>
    )
}

export default CommentItem