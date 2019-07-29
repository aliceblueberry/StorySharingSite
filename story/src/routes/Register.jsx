import React from 'react';
// import {graphql} from 'react-apollo';
// import gql from 'graphql-tag';

export default class Register extends React.Component {
    state = {
        username: '',
        password:'',
        // isAdmin: false,
    }

    onChange = (e) => {
        // console.log(e.target.checked);
        //uncomment to create Admin account
        // if(e.target.name === 'isAdmin'){

        // }else{
        this.setState({
            [e.target.name]:e.target.value,
        })
//  }
    }

//test: check if the input is submitted successfully
    onSubmit = () =>{
        // const response = await this.props.mutate({
        //     variables : this.state,
        // });
        console.log(this.state);
    }
    render() {
        return ( 
        <div>
            <input name='username'
            placeholder='Username' 
            onChange={e => this.onChange(e)} 
            value={this.state.username}/>

            <input name='password' 
            placeholder='Password' 
            type='password' 
            onChange={e => this.onChange(e)} 
            value={this.state.password}/>
        <button onClick={()=>this.onSubmit()} type="primary">Register</button>
        </div>
        //not using a form, do not care about redirection
        
        );
    }
}

// const mutation = gql`
// mutation($username: String!, $password: String!){
//     register(username: $username, password: $password){
//         id
//     }
// }
// `;
// export default graphql(mutation)(Register);