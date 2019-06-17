
import { getQuery } from '../../libs/utils'
import * as actions from './action.type'


export const oShowSidebar = (state = { show: !getQuery('hideCommonSidebar') }, action) => {
    const { type, motion = true } = action
    switch (type) {
        case actions.COMMON_LAYOUT_TOGGLE_SIDEBAR:
            return { show: !state.show }
        case actions.COMMON_LAYOUT_SHOW_SIDEBAR:
            return { show: true }
        case actions.COMMON_LAYOUT_HIDE_SIDEBAR:
            return { show: false }
        case actions.COMMON_LAYOUT_TOGGLE_SIDEBAR_SLIDE:
            return { show: !state.show, motion }
        case actions.COMMON_LAYOUT_SHOW_SIDEBAR_SLIDE:
            return { show: true, motion }
        case actions.COMMON_LAYOUT_HIDE_SIDEBAR_SLIDE:
            return { show: false, motion }
        default:
            return state
    }
}

export const oShowHeader = (state = { bShow: !getQuery('hideCommonHeader') }, action) => {
    const { type, motion = true } = action
    switch (type) {
        case actions.COMMON_LAYOUT_TOGGLE_HEADER:
            return { bShow: !state.bShow }
        case actions.COMMON_LAYOUT_SHOW_HEADER:
            return { bShow: true }
        case actions.COMMON_LAYOUT_HIDE_HEADER:
            return { bShow: false }
        case actions.COMMON_LAYOUT_TOGGLE_HEADER_SLIDE:
            return { bShow: !state.bShow, motion }
        case actions.COMMON_LAYOUT_SHOW_HEADER_SLIDE:
            return { bShow: true, motion }
        case actions.COMMON_LAYOUT_HIDE_HEADER_SLIDE:
            return { bShow: false, motion }
        default:
            return state
    }
}

export const bExpandSidebar = (state = !getQuery('collapseCommonSidebar'), action) => {
    switch (action.type) {
        case actions.COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE:
            return !state
        case actions.COMMON_LAYOUT_EXPAND_SIDEBAR:
            return true
        case actions.COMMON_LAYOUT_COLLAPSE_SIDEBAR:
            return false
        default:
            return state
    }
}


export const privilegeTree = (state = { isLoading: true, payload: [] }, action) => {
    const { type, payload = [], isLoading } = action
    switch (type) {
        case actions.SET_PRIVILEGE_MENU_TREE:
            return { payload, isLoading: false }
        case actions.SET_PRIVILEGE_MENU_TREE_LOADING:
            return { ...state, isLoading }
        default:
            return state
    }
}
