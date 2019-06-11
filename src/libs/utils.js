/*
 * @Author: Chosan.Zhangjianjun 
 * @Date: 2019-03-21 13:54:35 
 * @Last Modified by: Chosan.Zhangjianjun
 * @Last Modified time: 2019-03-22 14:04:13
 */


export function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
        return unescape(decodeURI(arr[2]));
    } else {
        return "";
    }
}

/**
 * 遍历树
 *
 * @export
 * @param {Object} treeNode
 * @param {String} [childrenField='children']
 * @yields 树中单个节点
 */
export function* treeWalker(treeNode, childrenField = 'children') {
    if (treeNode) {
        yield treeNode;
        const children = treeNode[childrenField];
        if (children) {
            for (const node of children) {
                yield* treeWalker(node, childrenField);
            }
        }
    }
}


/**
 * 查找树节点
 *
 * @export
 * @param {Array<Object>} tree
 * @param {*} id 
 * @param {string} [childrenField='children']
 * @param {string} [field='_id']
 * @returns 找到的节点或 undefined
 */
export function findTreeNode(tree, id, childrenField = 'children', field = '_id') {
    for (const node of treeWalker(tree, childrenField)) {
        if (node[field] == id) {
            return node;
        }
    }
}

// 从 arr2 中取 arr1 的差集
// arr1 = [1,2,3]  arr2 = [2,3,4] 则 complement(arr1, arr2) => [4]
export function complement(arr1 = [], arr2 = []) {
    const arr1tmp = [...arr1];
    const arr2tmp = [...arr2];
    do {
        let item = arr1tmp.pop();
        const arr2Index = arr2tmp.indexOf(item);
        if (~arr2Index) {
            arr2tmp.splice(arr2Index, 1);
        }
    } while (arr1tmp.length);
    return [...arr1tmp, ...arr2tmp];
}

// 对两个数组相互取差集
// arr1 = [1,2,3]  arr2 = [2,3,4] 则 complementReverse(arr1, arr2) => [1,4]
export function complementReverse(arr1 = [], arr2 = []) {
    const arr1tmp = [...arr1];
    const arr2tmp = [...arr2];
    let loop = arr1tmp.length;
    do {
        const cursor = loop - 1;
        const item = arr1tmp[cursor];
        const arr2Index = arr2tmp.indexOf(item);
        if (~arr2Index) {
            arr1tmp.splice(cursor, 1);
            arr2tmp.splice(arr2Index, 1);
        }
    } while (--loop);
    return [...arr1tmp, ...arr2tmp];
}


export const delay = (ms) => new Promise(res => setTimeout(res, ms));