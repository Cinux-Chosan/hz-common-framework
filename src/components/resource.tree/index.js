import React from  'react';
import ResourceTree from './resource.tree';
import { Provider } from 'react-redux';
import store from '../../redux';

export default (props) => {
    return (
        <Provider store={store}>
            {/* identity 需要使用方传入，默认值用于本地测试 */}
            <ResourceTree
                identity="UDM"
                {...props} />
        </Provider>
    )
}