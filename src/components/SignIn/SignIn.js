import React from "react";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedInEmail: '',
            signedInPassword: ''
        }
    };

    onEmailChange = (event) => {
        this.setState({ signedInEmail: event.target.value });
    };
    
    onPassChange = (event) => {
        this.setState({ signedInPassword: event.target.value });
    };

    onSubmitSignIn = (event) => {
        event.preventDefault();
        fetch("http://localhost:3001/signin", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signedInEmail,
                password: this.state.signedInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data !== 'no such user') {
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                }
            })
    };
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center glass">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPassChange} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" className="f6 link dim black db" style={{ cursor: 'pointer' }} onClick={() => { onRouteChange('register') }}>Register</a>
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default SignIn;