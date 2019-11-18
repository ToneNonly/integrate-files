const resourceTypes = require('../types/resourceTypes')

function cycleGroupMovements(integrate, options) {
    integrate.resources.set(resourceTypes.CYCLE_OPTIONS, options)

    integrate.resources.set(resourceTypes.CYCLE_GROUP_MOVEMENTS, (places, options) => {
        let failPlaces = []

        doMovements(places, options).then(() => {
            console.log('收藏失败：' + failPlaces)
        })

        async function doMovements(places, options) {
            for (let place of places) {
                for (let option of options) {
                    let result = true;
                    await new Promise((resolve, reject) => {
                        setTimeout(() => {

                            let target = option.target
                            if (target) {
                                target = document.querySelector(target)
                                if (option.beforeMove && !option.beforeMove(target)) {
                                    //=>前序检查未通过
                                    
                                    try {
                                        if (!target || target.className.indexOf('serp-list') >= 0) failPlaces.push(`"${place}"`)
                                        result = false
                                    } catch(e) {
                                        console.log(e)
                                        failPlaces.push(`"${place}"`)
                                    }
                                
                                } else {
                                    //=>前序检查通过
                                    
                                    //--------------------Object.assign会改变原对象！！！！-----------------//
                                    createMovement({...option, target, inputValue: place})
                                    option.afterMove && option.afterMove(target)
                                }
                            }
                            resolve()
                        }, option.time)
                    })

                    if (!result) break;
                }
            }
        }

        function createMovement(option) {
            let {target, move, value, inputValue} = option
            if (move === 'click') target.click()
            else if (move === 'input') target.value = inputValue || value
        }

    })

    //=>用 "$$$" 区分执行语句和普通string
    integrate.resources.set(resourceTypes.RUN_CYCLE_GROUP_MOVEMENTS, `$$$${resourceTypes.CYCLE_GROUP_MOVEMENTS}(${resourceTypes.PLACES_TO_BE_COLLECTED}, ${resourceTypes.CYCLE_OPTIONS})`)
}

module.exports = cycleGroupMovements


