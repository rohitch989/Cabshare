import React, { Component } from "react";
import "./Driver.css";
import SignUp from './User/Form';
import Login from './User/Login';

class Driver extends Component {
  state = {
    form: "login",
  };
  form = (id) => {
    this.setState({ id });
  };

  render() {
    const change = (m) => {
      this.setState({ form: m })
    }
    return (
      <div className='driver-background '>
        <div className='driver-header'>
          <div className='rider-strip ' >
          </div><div className='strip-border' >
          </div>
          <a className='logo-driver' href='/cabshare'>
            <span>c</span>
            <span>a</span>
            <span>b</span>
            <span>S</span>
            <span>h</span>
            <span>a</span>
            <span>r</span>
            <span>e</span>
          </a>
        </div>
        <div className='driver-content'>
          <h1 className='driver-h1'>
            Welcome Driver
        </h1>
          <p className='driver-paragraph'>
            "Travelling is a paradox,Just like art .No matter how much you have done,you have not done it enough"
</p>
        </div>

        <div className='rider-span driver-span'>
          <div className='form-signup'>
            <input type='radio' id='login' name='signup' className='rider-form-radio-sign' defaultChecked onClick={
              () => this.setState({ form: 'login' })
            } />
            <span ></span>

            <label htmlFor='login'> Login</label>
          </div>
          <div className='form-signup'>
            <input type='radio' id='signUp' name='signup' className='rider-form-radio' onClick={
              () => {
                this.setState({ form: 'signup' })
              }
            } />
            <span ></span>
            <label htmlFor='signUp'> SignUp</label>
          </div>

        </div>
        <div className='driver-form'>
          {
            this.state.form === 'login' ? <div><Login /></div> : <div><SignUp change={change} /></div>
          }
        </div>

      </div >
    );
  }
}

export default Driver;
