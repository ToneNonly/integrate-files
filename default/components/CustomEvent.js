class CustomEvent {
    constructor(options = {}, hooks = {}) {
        //=>批量赋值
        Object.assign(this, options, { hooks })
    }

    /**
     * ADD EVENT LISTENER
     * @param {String} event 
     * @param {Function | Array} callback
     */
    addEventListener(event, callback) {
        if (callback instanceof Function) this.hooks[event].push(callback)
        else if (Array.isArray(callback)) callback.forEach(val => val instanceof Function && this.hooks[event].push(val))
    }

    /**
     * DISPATCH EVENT
     * @param {String} event 
     */
    dispatchEvent(e) {
        let {event} = e
        this._batchFunctions(this.hooks[event], [e])
    }

    _batchFunctions(arr, args = []) {
        if (!Array.isArray(arr)) return
        arr.forEach(val => {
            val.apply(this, args)
        })
    }

    //--------------------(未完成)解除特定绑定--------------------//
    //-------------------（未完成）清空绑定-----------------------//
}


module.exports = CustomEvent