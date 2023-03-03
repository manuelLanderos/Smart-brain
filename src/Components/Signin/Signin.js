import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch('https://smart-brain-lkqg.onrender.com/signin', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          // does the user exist? Did we receive a user with a property of id?
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <article className="pa4 black-80">
          Sign In
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="ph0 mh0 fw6 clip">Register</legend>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" htmlFor="email-address">
                  Email address
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent w-100 measure"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="mt3">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                type="submit"
                value="Sign in"
              />
              <p
                onClick={() => this.props.onRouteChange('register')}
                className="pa4 f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </article>
      </article>
    );
  }
}

export default SignIn;
