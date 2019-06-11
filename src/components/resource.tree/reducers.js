import { SAVE_RESOURCE_TREE, SET_RESOURCE_TREE_NODE_LOADING, SET_RESOURCE_OPEN_KEYS, SET_RESOURCE_SEARCH_TEXT } from './action.type';
import { findTreeNode } from '../../libs/utils';

export const resourceTree = (state = { data: [] }, action) => {
    switch (action.type) {
        case SAVE_RESOURCE_TREE: {
            const { queryParams: { resource }, payload } = action;
            if (resource) {
                // 有 resource id ， 组装数据
                const node = findTreeNode(state, resource, 'child', 'resource');
                if (node) {
                    node.loading = false;
                    const notInNode = payload.data.filter(el => !node.child.find(({ resource }) => resource === el.resource))
                    // 合并元素，不影响原有数据，因为原有子节点可能有多层数据，但此时返回的数据可能只有一层，直接赋值会删除掉原有数据的更深层级节点
                    node.child.push(...notInNode);
                }
                return { ...state };
            } else {
                // 无 resource id， 根节点数据
                payload.child = payload.data;
                return { ...payload };
            }
        }
        case SET_RESOURCE_TREE_NODE_LOADING: {
            const { payload: { resource, node = findTreeNode(state, resource, 'child', 'resource'), loadingState = false } } = action;
            if (node) {
                node.loading = loadingState;
            } else if (!resource || resource === 'root') { // resource 为 '' 或者 'root' 则代表加载树的根节点
                return { ...state, loading: loadingState };
            }
            return state;
        }
    }
    return state;
}

export const resourceTreeOpenKeys = (state = { openKeysWithoutSearch: [], openKeysWhenSearch: [] }, action) => {
    switch (action.type) {
        case SET_RESOURCE_OPEN_KEYS: {
            // merge 是否需要将 openKeys 合并，当在搜索时加载子级全量树是需要 merge
            const { payload: { openKeys = [], search, merge } } = action;
            const { openKeysWhenSearch, openKeysWithoutSearch } = state;
            if (search) {
                return { ...state, openKeysWhenSearch: [...new Set(merge ? [...openKeysWhenSearch, ...openKeys] : openKeys)] };
            } else {
                return { ...state, openKeysWithoutSearch: [...new Set(merge ? [...openKeysWithoutSearch, ...openKeys] : openKeys)] };
            }
        }
    }
    return state;
}

export const resourceTreeSearch = (state = '', action) => {
    switch (action.type) {
        case SET_RESOURCE_SEARCH_TEXT: {
            return action.payload;
        }
    }
    return state;
}