var places = ["绿城西山燕庐","绿城西府海棠","欢乐大都汇","泰禾西府大院","燕西华府","领秀翡翠山","远洋五里春秋","华银城","远洋天著春秋","翡翠山晓"];
/**
 * CREATE ELEMENT EVENT AND EXECUTE
 * @param {HTMLElement} target
 * @param {String} move
 * @param {String | Number} value
 * @param {String | Number} inputValue
 * @returns {void}
 */
;;
var createMovement = function createMovement(target, move, value, inputValue) {
    
    if (move === 'click') target.click()
    else if (move === 'input') {
        target.value = inputValue
    }
}/**
 * CREATE PROMISE DELAYING TASK 
 * @param {String | NUMBER} time
 * @param {Function} callback
 * @returns {Promise}
 */
;;
var createStep = function createStep(time = 0, callback, ...args) {
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
};;
var movements = {
    movements: [
        {
            target: '#searchipt',
            move: 'input',
            time: 0
        },
        {
            target: '.searchlogo',
            move: 'click',
            time: 1000
        },
        {
            target: '.serp-list .poibox',
            move: 'click',
            beforeMove() {
                if (!this || this.className.indexOf('poibox-empty') > -1) return false
                return true 
            },
            time: 1000
        },
        {
            target: '.collect',
            move: 'click',
            beforeMove() {
                if (this.className.indexOf('faved') >= 0) return false
                return true
            },
            time: 1000
        },
        {
            time: 2000
        }
    ]
}//----------------------------开发环境入口index.js，生产环境入口_index.js-------------------------------------/

/***********2.11.11**********/
/***********2019.11.11*******/
/*********** */


/***********1.0.1************/
/***********2019.10.31*******/
/*************REFRESH***************************************************************************
 *********map.js运行后会自动将内容复制到剪切板，所以可以省去第四步中的复制步骤了************************
 ***********************************************************************************************/
/***********end**************/


/********1.0.0****************/
/********2019.10.31***********/
/******************************************使用指南***************************************************
 ***********1. 将xlsx文件放入./resource文件夹下，清空不需要的信息，记录所需数据的相关信息，分别是：
 *******************工作表名称，如'楼盘信息'
 *******************单元格列名，如'A'
 *******************起始单元格行数，如1
 *******************末尾单元格行数，如110
 ***********2. 根据步骤1中所记录信息分别更新./map.js文件中的全局常量sheetName、position、from、to
 ***********3. 运行map.js：node map.js
 ***********4. 复制./_index.js中的全部内容到devTools的Console下，运行
 *************************************************************************************************/
/********end*************/


var lastOne = places[places.length - 1]
console.log(`需要收藏的全部地方，一共${places.length}个：${places}`)

async function collectPlaceV2(place) {
  for (let movement of movements.movements) {
    movement.target ? await createStep(movement.time, function() {
      let target = document.querySelector(movement.target)

      if (movement.beforeMove) {
        if (!movement.beforeMove.call(target)) throw new Error(`${place} ${movement.target} ${movement.move} 动作前 出错！`)
      }
    
      createMovement(target, movement.move, movement.value || null, place)

      if (movement.afterMove) {
        if (!movement.afterMove.call(target)) throw new Error(`${place} ${movement.target} ${movement.move} 动作后 出错！`)
      }

    }) : await createStep(movement.time)

  }
}



//=>Promise保证列表收藏按顺序进行，一个收藏完再进行下一个
places.reduce((prom, val) => {
  // return prom.then(() => collect(val))
  return prom.finally(() => collectPlaceV2(val))
}, Promise.resolve())