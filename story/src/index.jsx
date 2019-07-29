import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Routes from './routes';

// eslint-disable-next-line
const client = new ApolloClient({
    uri: 'http://localhost:3000'
    //the server location (may need to change)
}); 
const App = () => ( 
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
)
ReactDOM.render( < App /> , document.getElementById('root'));