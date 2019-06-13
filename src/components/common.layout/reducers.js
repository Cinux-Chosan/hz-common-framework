
import { getQuery } from '../../libs/utils'
import { 
    COMMON_LAYOUT_TOGGLE_SIDEBAR, 
    COMMON_LAYOUT_SHOW_SIDEBAR, 
    COMMON_LAYOUT_HIDE_SIDEBAR,
    COMMON_LAYOUT_TOGGLE_HEADER, 
    COMMON_LAYOUT_SHOW_HEADER, 
    COMMON_LAYOUT_HIDE_HEADER,
    COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE,
    COMMON_LAYOUT_EXPAND_SIDEBAR,
    COMMON_LAYOUT_COLLAPSE_SIDEBAR,
    SET_PRIVILEGE_MENU_TREE,
    SET_PRIVILEGE_MENU_TREE_LOADING } from './action.type'


export const bShowSidebar = (state = !getQuery('hideCommonSidebar'), action) => {
    switch (action.type) {
        case COMMON_LAYOUT_TOGGLE_SIDEBAR:
            return !state
        case COMMON_LAYOUT_SHOW_SIDEBAR:
            return true
        case COMMON_LAYOUT_HIDE_SIDEBAR:
            return false
        default:
            return state
    }
}

export const bShowHeader = (state = !getQuery('hideCommonHeader'), action) => {
    switch (action.type) {
        case COMMON_LAYOUT_TOGGLE_HEADER:
            return !state
        case COMMON_LAYOUT_SHOW_HEADER:
            return true
        case COMMON_LAYOUT_HIDE_HEADER:
            return false
        default:
            return state
    }
}

export const bExpandSidebar = (state = !getQuery('collapseCommonSidebar'), action) => {
    switch (action.type) {
        case COMMON_LAYOUT_TOGGLE_SIDEBAR_COLLAPSE:
            return !state
        case COMMON_LAYOUT_EXPAND_SIDEBAR:
            return true
        case COMMON_LAYOUT_COLLAPSE_SIDEBAR:
            return false
        default:
            return state
    }
}


export const privilegeTree = (state = { isLoading: true }, action) => {
    const { type, payload, isLoading } = action
    switch (type) {
        case SET_PRIVILEGE_MENU_TREE:
            return { payload, isLoading: false }
        case SET_PRIVILEGE_MENU_TREE_LOADING:
            return { ...state, isLoading }
        default:
            return state
    }
}
