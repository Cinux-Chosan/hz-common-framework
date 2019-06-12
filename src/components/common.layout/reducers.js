
import { COMMON_LAYOUT_TOGGLE_SIDEBAR, COMMON_LAYOUT_SHOW_SIDEBAR, COMMON_LAYOUT_HIDE_SIDEBAR } from './action.type'

export const showSidebar = (state = true, action) => {
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
