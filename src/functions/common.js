/**
 * 判斷 是否為array && array至少有一個值
 * @param {Array} array
 * @returns {Boolean}
 */
export const isArray = array => array && Array.isArray(array) && array.length > 0
