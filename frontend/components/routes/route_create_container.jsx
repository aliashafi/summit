import { connect } from 'react-redux';
import {createRoute} from '../../actions/routes/route_actions'
import RouteCreate from './route_create'

const mapStateToProps = ( state ) => ({
    currentUser: state.session.currentUser
   
})

const mapDispatchToProps = (dispatch) => ({
    createRoute: (userId, route) => dispatch(createRoute(userId, route))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreate);