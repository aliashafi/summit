import { connect } from 'react-redux';
import { login, clearErrors} from '../../actions/session';
import Login from './login'

const mapStateToProps = ({errors}) => ({
    errors: errors.session
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);