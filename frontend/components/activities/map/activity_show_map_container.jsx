import { connect } from 'react-redux'
import ActivityShowMap from './activity_show_map'

const mapStateToProps = (state) => ({
    ui: state.ui
})



export default connect(
    mapStateToProps,
    null
)(ActivityShowMap)