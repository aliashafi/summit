import React from 'react'
import CommentItem from './comment_item'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchAllActivities} from '../../../actions/activities/activity_actions'
import { fetchActivityComments} from '../../../actions/comments/comment_actions'

const mapStateToProps = (state, ownProps) => ({
    activities: state.entities.activities,
    comments: state.entities.comments,
    users: state.entities.users
})

const mapDispatchToProps = (dispatch) => ({
    fetchActivityComments: (activityId) => dispatch(fetchActivityComments(activityId)),
    fetchAllActivities: (page) => dispatch(fetchAllActivities(page)),
})

// const CommentIndex = ({users, comments, activity}) => {
class CommentIndex extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidUpdate(prevProps){
        if ( Object.values(prevProps.comments).length !== Object.values(this.props.comments).length) {
            this.props.fetchAllActivities(1)
            // this.props.fetchActivityComments(this.props.activity.id)

        }
    }


    render(){
    const actComments = this.props.activity.comment_ids.map(commentId => this.props.comments[commentId])
    const allComments = actComments.map(comment => 
        <CommentItem 
            key={comment.id} 
            comment={comment} 
            user={this.props.users[comment.user_id]} 
            activity={this.props.activity}/>)
    return(
        <div>
            <div id= 'comments'>
                <div>
                    {allComments}
                </div>
        </div>
    </div>
    )}
}

export default withRouter(connect(
    mapStateToProps, 
    mapDispatchToProps)(CommentIndex))
