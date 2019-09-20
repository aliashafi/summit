import { connect } from 'react-redux';
import UserProfile from './user_profile'
import { fetchFollowers, fetchFollowing } from '../..//actions/follows/follows_action'
import { fetchUserActivities } from '../../actions/activities/activity_actions'
import { fetchUser } from '../../actions/users/user_actions';

const mapStateToProps = (state) => ({
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.followers),
    current_user: state.session.currentUser,
    activities: Object.values(state.entities.currentUserActivities),
    users: state.entities.users, 
    comments: state.entities.comments,
    kudos: state.entities.kudos,
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserActivities: () => dispatch(fetchUserActivities()),
    fetchFollowers: () => dispatch(fetchFollowers()),
    fetchFollowing: () => dispatch(fetchFollowing()),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile)