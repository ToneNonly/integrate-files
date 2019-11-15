module.exports = function syncExecute(arr, ...args) {
    if (!Array.isArray(arr)) return
    return async function (arr){
        for (let val of arr) {
            await val.apply(null, args)
        }
    }()
}





