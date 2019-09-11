import React from 'react'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    };

    handleSubmit(e) {
        e.preventDefault()
        this.props.createNewUser(this.state)
            .then(() => this.props.history.push('/feed'));
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
        <section className='home-container'>
            <h2 id="signIn-title">Join Summit today, it's Free.</h2>
            <div className="signIn-form">
                <form className='signIn-form-fill'>
                        <div id="errors">{this.renderErrors()}</div>
                    <label>
                        <br />
                        <input className="formInput" type="text"
                            value={this.state.username} placeholder= "username"
                            onChange={this.handleInput('username')}
                        />
                    </label>
                    <br/>

                    <label>
                        <br />
                            <input className="formInput" type="password"
                            value={this.state.password}
                                onChange={this.handleInput('password')} placeholder="password"
                        />
                    </label>
                    <br />

                    <label>
                        <br />
                            <input className="formInput" type="text"
                            value={this.state.first_name}
                                onChange={this.handleInput('first_name')} placeholder="Your First Name"
                        />
                    </label>
                    <br />

                    <label>
                        <br />
                            <input className="formInput" type="text"
                            value={this.state.last_name}
                                onChange={this.handleInput('last_name')} placeholder="Your Last Name"
                        />
                    </label>
                    <br />

                    <button className="signIn-button" onClick={this.handleSubmit}>Sign Up</button>
                </form>
            </div>
        </section>
        );
    }
};

export default Signup;