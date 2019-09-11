import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.demoUsernameStart = 0
        this.demoPasswordStart = 0
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoUser = this.demoUser.bind(this);
    }

    componentDidMount(){
    }

    demoUser(){
        let username = 'aliashafi'
        let password = '123456'
        if (this.demoUsernameStart < username.length) {
            document.getElementById("username").value += username.charAt(this.demoUsernameStart);
            this.setState({ username: document.getElementById("username").value });
            this.demoUsernameStart++;
            setTimeout(this.demoUser, 100);
        }
        
        if (this.demoPasswordStart < password.length) {
            document.getElementById("password").value += password.charAt(this.demoPasswordStart);
            this.setState({ password: document.getElementById("password").value });
            this.demoPasswordStart++;
            setTimeout(this.demoUser, 100);
        }
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    };

    handleSubmit(e) {
        e.preventDefault()
        this.props.login(this.state)
            .then(() => this.props.history.push('/'))
            .fail(() => {
                return 
            });
    }
    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <section className='home-signIn-container' >
                <h2 id="signIn-title-signIn">Log In</h2>
                <div className="signIn-form-login">
                    <button onClick={this.demoUser} className="demoUser-button" >Log in as Demo User</button>
                    <div id="errors">{this.renderErrors()}</div>
                    <form>
                        <label>
                            <br />
                            <input id="username" className="formInput" type="text"
                                value={this.state.username} placeholder="username"
                                onChange={this.handleInput('username')}
                            />
                        </label>
                        <br />

                        <label>
                            <br />
                            <input id="password" className="formInput" type="password"
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