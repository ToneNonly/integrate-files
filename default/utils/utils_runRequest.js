/**
 * START A HTTP REQUEST
 * @param {Object}
 *      {String} method
 *      {String} method
 *      {Function | Void} callback
 *      {Object | Void} payload
 */
function runRequest({ method = 'GET', url, callback, payload}) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback.call(null, xhr)
        }
    }
    xhr.send(JSON.stringify(payload) || null);
}

module.exports = runRequest