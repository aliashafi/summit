import * as CommentUtil from '../../util/comment_util'

export const RECEIVE_ACTIVITY_COMMENTS = 'RECEIVE_ACTIVITY_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

const receiveActivityComments = (comments) => ({
    type: RECEIVE_ACTIVITY_COMMENTS, 
    comments
})

const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
}) 



export const fetchActivityComments = (activityId) => (dispatch) => 
    CommentUtil.fetchActivityComments(activityId).then((comments) => dispatch(receiveActivityComments(comments)))


export const createComment = (comment) => (dispatch) =>
    CommentUtil.createComment(comment).then((comment) => dispatch(receiveComment(comment)))