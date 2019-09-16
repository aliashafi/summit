import { connect } from 'react-redux';
import {createRoute} from '../../actions/routes/route_actions'
import RouteCreate from './route_create'

const mapStateToProps = (  ) => ({
   
})

const mapDispatchToProps = (dispatch) => ({
    createRoute: (route) => dispatch(createRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreate);