let PLACES_TO_BE_COLLECTED = ["绿城西山燕庐", "绿城西府海棠", "欢乐大都汇", "泰禾西府大院", "燕西华府", "领秀翡翠山", "远洋五里春秋", "华银城", "远洋天著春秋", "翡翠山晓", "西山天璟", "城建国誉府", "一渡青青小镇", "丽景长安", "紫御长安", "龙樾西山", "泰禾长安中心", "翡翠长安", "翡翠西湖", "长安壹号", "华远裘马四季", "中粮京西祥云", "华萃西山", "中粮西海", "西山艺境华墅", "电建金地华宸", "远洋新天地", "西长安壹号", "紫辰院", "七橡墅", "珠光御景西园", "西山甲一号", "国风长安", "檀香府", "保利和光逸境", "大湖风华", "北湖壹号", "汤泉墅", "中昂时代广场", "昌平拾景园", "强佑府学上院", "丽春湖院子", "世茂西山龙胤", "丽春湖墅", "翡翠云图", "紫宸山", "公园悦府", "E_ZIKOO智慧谷", "招商都会湾", "时代8号", "时代公馆", "首创天阅西山", "威海碧海蓝湾", "绿地悦都会", "花雨汀", "山屿西山著", "北京院子二期", "金隅上城郡", "未来公元", "国瑞熙墅", "天瑞宸章", "誉天下", "御汤山熙园", "艾迪公园", "祥云赋", "龙湾棠尚", "尚峯壹號", "北京岭秀", "中粮瑞府", "观承二期", "观承别墅·大家", "观承别墅·大家洋房", "金隅上城庄园", "华润未来城市", "金辰府", "新世界丽樽", "中铁诺德阅墅", "公园十七区", "北京城建·北京合院", "合景香悦四季", "金宝天阶", "颐和天璟", "首开·国风尚樾", "润泽御府", "天润福熙大道", "未来金茂府", "顺颐府", "融尚未来", "万科.天竺悦府", "绿地新干线", "合景天汇广场", "合景天汇", "城市之光东望", "鲁能格拉斯", "霞公府", "金麟府", "亦庄金茂府", "熙悦林语", "熙悦诚郡", "台湖银河湾", "熙悦安郡", "尊悦光华", "元熙华府", "华侨城和园", "北京公馆", "恭和家园", "首创天禧", "朝青知筑", "利锦府", "和锦薇棠", "和光尘樾", "林肯公园", "林肯时代", "通泰国际公馆", "和悦华锦", "北京金茂府", "德贤公馆", "合景中心", "北京东湾", "新地国际家园", "金府大院", "天悦壹号", "公园懿府", "兴创荣墅", "兴创总部公园", "大兴金茂悦", "佑安府", "懋源璟岳", "金融街融府", "颐璟万和", "懋源钓云台", "海湾新城", "梦幻庄园三期", "The Gardens at Lovejoy", "Mason's Mill Estates", " 788 West Midtown", "天宁豪庭"];; 
let CYCLE_OPTIONS = [{target: "#searchipt", move: "input", time: 0}, {target: ".searchlogo", move: "click", time: 1000}, {target: ".serp-list .poibox", move: "click", beforeMove: function beforeMove(target) {
                        if (!target || target.className.indexOf('poibox-empty') > -1) return false
                        return true
                    }, time: 2000}, {target: ".collect", move: "click", beforeMove: function beforeMove(target) {
                        if (target.className.indexOf('faved') >= 0) return false
                        return true
                    }, time: 2000}, {time: 2000}];; 
let CYCLE_GROUP_MOVEMENTS = (places, options) => {
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
                                try {
                                    if (option.beforeMove && !option.beforeMove(target)) {
                                        //=>前序检查未通过

                                        if (!target || target.className.indexOf('serp-list') >= 0) failPlaces.push(`"${place}"`)
                                        result = false
                                        failPlaces.push(`"${place}"`)

                                    } else {
                                        //=>前序检查通过

                                        //--------------------Object.assign会改变原对象！！！！-----------------//
                                        createMovement({ ...option, target, inputValue: place })
                                        option.afterMove && option.afterMove(target)
                                    }
                                } catch (e) {
                                    console.log(e)
                                    result = false
                                    failPlaces.push(`"${place}"`)
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
let RUN_CYCLE_GROUP_MOVEMENTS = CYCLE_GROUP_MOVEMENTS(PLACES_TO_BE_COLLECTED, CYCLE_OPTIONS);;
