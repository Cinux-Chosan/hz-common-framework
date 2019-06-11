import { FETCH_RESOURCE_TREE, SET_RESOURCE_TREE_NODE_LOADING, SAVE_RESOURCE_TREE, SET_RESOURCE_OPEN_KEYS } from './action.type';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { stringify } from 'query-string';
import request from '../../libs/request';
import { treeWalker, delay } from '../../libs/utils';
import { formatKey } from './resource.tree';

function* setOpenKeys(resourceTree, search) {
    if (search) {
        // 如果没有搜索出内容，data 为 null
        const { data } = resourceTree;
        const [rootTree] = data || [];
        const openKeysWhenSeach = [];
        for (const treeNode of treeWalker(rootTree, 'child')) {
            if (treeNode.child && treeNode.child.length) {
                openKeysWhenSeach.push(formatKey(treeNode));
            }
        }
        yield put({ type: SET_RESOURCE_OPEN_KEYS, payload: { search, openKeys: openKeysWhenSeach, merge: true } });
    }
}

const fetchResourceTree = () => {
    const cachedTreeNode = {};
    return function* (action) {
        const { payload: queryParams = {} } = action;
        const { resource = 'root', search = '', identity = '', onSearch } = queryParams;
        const cacheKey = `${identity}&${resource}&${search}`;
        let payload = cachedTreeNode[cacheKey];
        if (!payload) {
            yield put({ type: SET_RESOURCE_TREE_NODE_LOADING, payload: { resource, loadingState: true } });
            [payload] = yield all([
                call(request, `/api/infra-uuv/v0.1/users/privilege-resources-tree?${stringify({ statistics_node_type: 6, ...queryParams })}`),
                delay(1000) // 设置 1000 延时，不至于接口返回太快导致 loading 一闪而过用户无法看清是什么情况，只有首次加载数据会发生
            ]);
            cachedTreeNode[cacheKey] = payload;
        }
        // 是否通过搜索框触发, onSearch 为 true 则表示是从搜索框触发
        if (onSearch) {
            yield* setOpenKeys(payload, search);
        }
        yield put({ type: SAVE_RESOURCE_TREE, payload, queryParams });
    }
}

export default function* () {
    yield takeLatest(FETCH_RESOURCE_TREE, fetchResourceTree());
}