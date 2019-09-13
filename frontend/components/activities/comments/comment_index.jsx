import React from 'react'
import CommentItem from './comment_item'

const CommentIndex = ({users, comments}) => {
    
    const allComments = comments.map(comment => <CommentItem key={comment.id} comment={comment} user={users[comment.user_id]}/>)
    return(
        <div>
            <div id='comment-icon'>
                <img src={window.images.comment_icon} alt=""/>
            </div>

            <div id= 'comments'>
                <div>
                    {allComments}
                </div>
        </div>
    </div>
    )
}

export default CommentIndex