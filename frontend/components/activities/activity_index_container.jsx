import { fetchAllActivities, fetchActivity } from '../../actions/activities/activity_actions'
import ActivityIndex from './activity_index'
import {fetchUser} from '../../actions/users/user_actions'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    return ({
    })
}

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (id) => dispatch(fetchUser(id))
})

export default withRouter(connect(
    mapStateToProps, 
    mapDispatchToProps
)(ActivityIndex))

