/**
 * CREATE PROMISE DELAYING TASK 
 * @param {String | NUMBER} time
 * @param {Function} callback
 * @returns {Promise}
 */
module.exports = function createStep(time = 0, callback, ...args) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            try {
                let res;
                if (callback) {
                    res = callback.apply(null, args)
                }
                resolve(res)
            } catch (e) {
                console.log('捕获到错误，运行reject: ', e)
                reject(e)
            }
        }, time)
    })
}