import React from  'react';
import { Provider } from 'react-redux';
import Layout, { CommonLayout } from './layout'
import store from '../../redux';

export default (props) => {
    return (
        <Provider store={store}>
            <Layout {...props}/>
        </Provider>
    )
}
