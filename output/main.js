let PLACES_TO_BE_COLLECTED = ["未来公元", "国瑞熙墅", "天瑞宸章", "懋源钓云台", "海湾新城", "梦幻庄园三期", "The Gardens at Lovejoy", "Mason's Mill Estates", " 788 West Midtown"];; 
let CYCLE_OPTIONS = [{target: "#searchipt", move: "input", time: 0}, {target: ".searchlogo", move: "click", time: 1000}, {target: ".serp-list .poibox", move: "click", beforeMove: function beforeMove(target) {
                        if (target.className.indexOf('poibox-empty') > -1) return false
                        return true
                    }, time: 2000}, {target: ".collect", move: "click", beforeMove: function beforeMove(target) {
                        if (target.className.indexOf('faved') >= 0) return false
                        return true
                    }, time: 2000}, {time: 2000}];; 
let RUN_REQUEST = function runRequest({ method = 'GET', url, callback, payload}) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback.call(null, xhr)
        }
    }
    xhr.send(JSON.stringify(payload) || null);
};; 
let CYCLE_GROUP_MOVEMENTS = (places, options, runRequest) => {
        let failPlaces = []

        doMovements(places, options).then(() => {
            console.log('收藏失败：' + failPlaces)            
            console.log('正在将收藏失败的地址发往服务器...')
            runRequest({
                method: 'POST',
                url: 'http://127.0.0.1:3000',
                callback: (xhr) => {
                    console.log(xhr.response)
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

    };; 
let RUN_CYCLE_GROUP_MOVEMENTS = CYCLE_GROUP_MOVEMENTS(PLACES_TO_BE_COLLECTED, CYCLE_OPTIONS, RUN_REQUEST);;
