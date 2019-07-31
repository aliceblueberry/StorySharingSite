import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
// import { ValidatorForm, TextValidator} from 'react-form-validator-components';
export default class Registration extends React.Component{
state={
    username:"",
    usernameError:"",
    password:"",
    passwordError:"",
};

handleChange= e =>{
    this.setState({
        [e.target.name]:e.target.value
        });
    };

    handlePasswordChange= e =>{
        // console.log(e);
        // this.props.change({username: e})
        this.setState({
            [e.target.name]:e.target.value
            });
        };

validate=() =>{
let isError = false;
// const errors = {
//     usernameError:"",
//     passwordError:""
// };

if(this.state.username.length < 3){
    isError = true;
    this.setState({usernameError:"error"});
    alert("Username needs to be at least 3 characters long.");
}

if(this.state.password.length < 4){
    isError = true;
    this.setState({passwordError:"error"});
    alert("Password needs to be at least 4 characters long.");
}

// if(isError){
//     this.setState({
// ...this.state,
// ...errors
//     });
// }

return isError;
}


handleSubmit = e =>{
    e.preventDefault();
    //check for the errors
    const err = this.validate();
    console.log(!err);

    if(!err){
    //clear the form
    this.setState({
        username:"",
        usernameError:"",
        password:"",
        passwordError:""
   
    });

// this.props.change({
//     username:"",
//     password:""
// });
    }
    else{
        console.log(this.state.usernameError);
    }
};


    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <TextField
                name="username"
                placeholder="username"
                value={this.state.username}
                error={this.state.usernameError==="error"}
                onChange={this.handleChange}
                />

                
                <br></br>

                <TextField
                name="password"
                placeholder="password"
                // type="password"
                value={this.state.password}
                onChange={this.handleChange}
                error={this.state.passwordError==="error"}/>
    

<Button onClick={event =>this.handleSubmit(event)}> Create Account</Button>
         </form>
        )
    }

}