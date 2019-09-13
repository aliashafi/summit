import { connect } from 'react-redux';
import { fetchAllActivities} from '../../actions/activities/activity_actions'
import { fetchFollowers, fetchFollowing } from '../../actions/follows/follows_action'
import { fetchAllUsers } from '../../actions/users/user_actions'
import { fetchActivityComments } from '../../actions/comments/comment_actions'
import Feed from "./feed"

const mapStateToProps = (state) => ({
    activities: Object.values(state.entities.activities),
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.followers),
    current_user: state.session.currentUser,
    users: state.entities.users,
    comments: state.entities.comments
})

const mapDispatchToProps = (dispatch) => ({  
    fetchAllActivities: (page) => dispatch(fetchAllActivities(page)),
    fetchActivity: () => dispatch(fetchActivity()),
    fetchFollowers: () => dispatch(fetchFollowers()),
    fetchFollowing: () => dispatch(fetchFollowing()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchActivityComments: (activityId) => dispatch(fetchActivityComments(activityId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed)