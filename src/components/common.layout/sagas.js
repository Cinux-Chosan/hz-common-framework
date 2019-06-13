import {
    GET_PRIVILEGE_MENU_TREE,
    SET_PRIVILEGE_MENU_TREE,
    SET_PRIVILEGE_MENU_TREE_LOADING
} from './action.type'
import { put, takeLatest, call, all, delay } from 'redux-saga/effects'
import { getPrivilegeMenusTree } from '../../libs/userRole'

function* sagaGetPrivilegeMenusTree() {
    try {
        yield put({ type: SET_PRIVILEGE_MENU_TREE_LOADING, isLoading: true })
        const [{ data: payload }] = yield all([call(getPrivilegeMenusTree), delay(0)])
        yield put({ type: SET_PRIVILEGE_MENU_TREE, payload })
    } catch (error) {
        // TODO： 请求报错，打印错误消息 
        debugger
        yield put({ type: SET_PRIVILEGE_MENU_TREE_LOADING, isLoading: false })
    }
}


export default function* () {
    yield takeLatest(GET_PRIVILEGE_MENU_TREE, sagaGetPrivilegeMenusTree)
}
