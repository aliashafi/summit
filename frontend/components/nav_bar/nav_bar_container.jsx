import { logout } from '../../actions/session';
import { connect } from 'react-redux';
import react from 'react';
import NavBar from './nav_bar';
import {withRouter} from 'react-router-dom'


const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar));