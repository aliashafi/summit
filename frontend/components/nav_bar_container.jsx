import { logout } from '../actions/session';
import { connect } from 'react-redux';
import React from 'react';
import NavBar from './nav_bar';
import {withRouter} from 'react-router-dom'


const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar));