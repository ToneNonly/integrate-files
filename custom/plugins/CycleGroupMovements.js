const resourceTypes = require('../types/resourceTypes')
const runRequest = require('../../default/utils/utils_runRequest')

function cycleGroupMovements(integrate, options) {
    integrate.resources.set(resourceTypes.CYCLE_OPTIONS, options)

    integrate.resources.set(resourceTypes.RUN_REQUEST, runRequest)

    integrate.resources.set(resourceTypes.CYCLE_GROUP_MOVEMENTS, (places, options, runRequest) => {
        let failPlaces = []

        doMovements(places, options).then(() => {
            console.log('收藏失败：' + failPlaces)            
            console.log('正在将收藏失败的地址发往服务器...')
            runRequest({
                method: 'POST',
                url: 'http://127.0.0.1:3000',
                callback: (xhr) => {
                    console.log(xhr.responseText)
                },
                payload: {
                    output: 'output/failPlaces.json',
                    data: failPlaces
                }
            })
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
                                try {
                                    if (target) {
                                        if (option.beforeMove && !option.beforeMove(target)) {
                                            //=>前序检查未通过
    
                                            if (target.className.indexOf('poibox-empty') >= 0) failPlaces.push(`${place}`)
                                            
                                            result = false
    
                                        } else {
                                            //=>前序检查通过
    
                                            //--------------------Object.assign会改变原对象！！！！-----------------//
                                            createMovement({ ...option, target, inputValue: place })
                                            option.afterMove && option.afterMove(target)
                                        }
                                    } else {
                                        failPlaces.push(`${place}`)
                                        result = false
                                    }
                                } catch (e) {
                                    console.error(e)
                                    result = false
                                    failPlaces.push(`${place}`)
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
            let { target, move, value, inputValue } = option
            if (move === 'click') target.click()
            else if (move === 'input') target.value = inputValue || value
        }

    })

    //=>用 "$$$" 区分执行语句和普通string
    integrate.resources.set(resourceTypes.RUN_CYCLE_GROUP_MOVEMENTS, `$$$${resourceTypes.CYCLE_GROUP_MOVEMENTS}(${resourceTypes.PLACES_TO_BE_COLLECTED}, ${resourceTypes.CYCLE_OPTIONS}, ${resourceTypes.RUN_REQUEST})`)
}

module.exports = cycleGroupMovements


