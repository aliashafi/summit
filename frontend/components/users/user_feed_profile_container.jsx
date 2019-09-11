import { connect } from 'react-redux';
import UserFeedProfile from './user_feed_profile'
import {fetchFollowers, fetchFollowing} from '../..//actions/follows/follows_action'
import { fetchAllActivities} from '../../actions/activities/activity_actions'
import {fetchUser} from '../../actions/users/user_actions'

const mapStateToProps = (state) => ({
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.followers),
    current_user: state.session.currentUser,
    activities: Object.values(state.entities.activities),
    users: Object.values(state.entities.users)
})

const mapDispatchToProps = (dispatch) => ({
    fetchFollowers: () => dispatch(fetchFollowers()),
    fetchFollowing: () => dispatch(fetchFollowing()),
    fetchAllActivities: () => dispatch(fetchAllActivities())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserFeedProfile)