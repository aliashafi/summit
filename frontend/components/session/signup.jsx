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

    componentWillUnmount() {
        this.props.clearErrors()
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

    renderErrors(inputType) {
        let errors = this.props.errors.filter(word => word.includes(inputType))
        let error = errors[0]
        return (
            <p>{error}</p>
                    
            );

    }

    render() {
        return (
        <section className='home-container'>
            <h2 id="signIn-title">Join Summit today, it's Free.</h2>
            <div className="signIn-form">
                <form className='signIn-form-fill'>
                        
                    <label>
                        <br />
                        <input className="formInput" type="text"
                            value={this.state.username} placeholder= "Username"
                            onChange={this.handleInput('username')}
                        />
                    </label>
                        <div id="errors">{this.renderErrors("Username")}</div>
                        
                    <br/>

                    <label>
                        <br />
                            <input className="formInput" type="Password"
                            value={this.state.password}
                                onChange={this.handleInput('password')} placeholder="Password"
                        />
                    </label>
                        <div id="errors">{this.renderErrors("Password")}</div>
                    <br />

                    <label>
                        <br />
                            <input className="formInput" type="text"
                            value={this.state.first_name}
                                onChange={this.handleInput('first_name')} placeholder="First Name"
                        />
                    </label>
                    <br />

                    <label>
                        <br />
                            <input className="formInput" type="text"
                            value={this.state.last_name}
                                onChange={this.handleInput('last_name')} placeholder="Last Name"
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