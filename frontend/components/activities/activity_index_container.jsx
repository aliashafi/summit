import { fetchAllActivities, fetchActivity } from '../../actions/activities/activity_actions'
import ActivityIndex from './Activity_Index'
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    activities: Object.values(state.entities.activities)
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllActivities: () => dispatch(fetchAllActivities()), 
    fetchActivity: () => dispatch(fetchActivity())
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ActivityIndex)

