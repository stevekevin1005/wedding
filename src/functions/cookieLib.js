/**
 * 取得Cookie
 * @param {String} name
 */
export const getCookie = name => {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length === 2) return parts.pop().split(';').shift()
}

/**
 * 寫入Cookie
 * @param {String} name
 * @param {String} data
 */
export const writeCookie = (name, data) => (document.cookie = name.toString() + '=' + data + ';path=/')

/**
 * 刪除Cookie
 * @param {String} name
 */
export const deleteCookie = name => {
    var value = ''
    var days = -1
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    var expires = '; expires=' + date.toGMTString()
    document.cookie = name + '=' + value + expires + '; path=/'
}
