import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        debugger
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    };

    handleSubmit(e) {
        e.preventDefault()
        this.props.login(this.state)
            .then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <section className='home-signIn-container' >
                <h2 id="signIn-title-signIn">Log In</h2>
                <div className="signIn-form-login">
                    <form>
                        <label>
                            <br />
                            <input className="formInput" type="text"
                                value={this.state.username} placeholder="username"
                                onChange={this.handleInput('username')}
                            />
                        </label>
                        <br />

                        <label>
                            <br />
                            <input className="formInput" type="password"
                                value={this.state.password}
                                onChange={this.handleInput('password')} placeholder="password"
                            />
                        </label>
                            <br/>
                            <br/>

                        <button className="signIn-button" onClick={this.handleSubmit}>Log In</button>
                    </form>
                </div>
            </section>
        );
    }
};

export default Login;