import { connect } from 'react-redux';
import Feed from "./feed"

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
)(Feed)