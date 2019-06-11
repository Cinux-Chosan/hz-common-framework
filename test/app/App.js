// "hot(App)" shall only be used as export.
// Please refer to "Getting Started" (https://github.com/gaearon/react-hot-loader/).
import React from 'react';
import { hot } from 'react-hot-loader/root'
import ResourceTreeDemo from '@components/resource.tree/demo';
import CommonLayout from '@components/common.layout/demo';

const App = () => {
    return (
        <CommonLayout />
    )
}
export default hot(App);