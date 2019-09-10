import { connect } from 'react-redux';
import { login } from '../../actions/session';
import Login from './Login'

const mapStateToProps = ({errors}) => ({
    errors: errors.session
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: (user) => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);