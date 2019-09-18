import { connect } from 'react-redux';
import { fetchAllRoutes } from '../../actions/routes/route_actions'
import RouteIndex from './route_index'
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser,
    routes: state.entities.routes,
    users: state.entities.users

})

const mapDispatchToProps = (dispatch) => ({
    fetchAllRoutes: (id) => dispatch(fetchAllRoutes(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteIndex));