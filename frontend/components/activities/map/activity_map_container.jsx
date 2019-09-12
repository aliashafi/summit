import { fetchActivity } from '../../../actions/activities/activity_actions'
import { fetchAllUsers } from '../../../actions/users/user_actions'
import ActivtyShow from './activity_show';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    return ({
    activity: state.entities.activities[ownProps.match.params.activityId],
    users: state.entities.users
    })
}


const mapDispatchToProps = (dispatch) => ({
    fetchActivity: (id) => dispatch(fetchActivity(id)),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivtyShow))