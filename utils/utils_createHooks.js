module.exports = function createHooks(...args) {
    return function() {
        Array.prototype.forEach.call(args, func => {
            if(func instanceof Function) func()
        })
    }
}