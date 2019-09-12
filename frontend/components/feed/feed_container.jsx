import { connect } from 'react-redux';
import { fetchAllActivities} from '../../actions/activities/activity_actions'
import { fetchFollowers, fetchFollowing } from '../../actions/follows/follows_action'
import { fetchAllUsers } from '../../actions/users/user_actions'
import Feed from "./feed"

const mapStateToProps = (state) => ({
    activities: Object.values(state.entities.activities),
    followers: Object.values(state.entities.followers),
    following: Object.values(state.entities.followers),
    current_user: state.session.currentUser,
    users: Object.values(state.entities.users)
})

const mapDispatchToProps = (dispatch) => ({  
    fetchAllActivities: () => dispatch(fetchAllActivities()),
    fetchActivity: () => dispatch(fetchActivity()),
    fetchFollowers: () => dispatch(fetchFollowers()),
    fetchFollowing: () => dispatch(fetchFollowing()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed)