import { COMMON_LAYOUT_TOGGLE_SIDEBAR } from './action.type'
import { put, takeLatest } from 'redux-saga/effects'

function * toggleSidebar () {
    put({ type: COMMON_LAYOUT_TOGGLE_SIDEBAR })
}


export default function* () {
    yield takeLatest(COMMON_LAYOUT_TOGGLE_SIDEBAR, toggleSidebar)
}
