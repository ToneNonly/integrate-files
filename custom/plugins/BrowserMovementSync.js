class BrowserMovementSync {
    constructor(integrate, options) {
        Object.assign(this, integrate)
        this.options = options
        this.movementList = []
        this.moveId = 0
        this.init()
    }

    init() {
        this.createMovement(this.options)
    }

    createMovement(options) {
        let {target, move, value, inputValue} = options
        let movement;
        if (move === 'click') movement = () => target.click()
        else if (move === 'input') movement = () => target.value = inputValue || value

        this.movementList.push(movement)
        this.resources.push({
            name: ,
            handler: 
        })
    }

    do(...args) {
        this._syncExecute(this.movementList, args)
    }

    _syncExecute(arr, args = []) {
        if (!Array.isArray(arr)) return
        return async function (arr){
            for (let val of arr) {
                await val.apply(null, args)
            }
        }()
    }
}

module.exports = BrowserMovementSync