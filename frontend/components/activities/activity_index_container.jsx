import { fetchAllActivities, fetchActivity } from '../../actions/activities/activity_actions'
import ActivityIndex from './activity_index'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return ({
    activities: Object.values(state.entities.activities), 
    current_user: state.session.currentUser,
    })
}

const mapDispatchToProps = (dispatch) => ({
    fetchAllActivities: () => dispatch(fetchAllActivities()), 
    fetchActivity: () => dispatch(fetchActivity())
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ActivityIndex)

