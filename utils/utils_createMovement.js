/**
 * CREATE ELEMENT EVENT AND EXECUTE
 * @param {HTMLElement} target
 * @param {String} move
 * @param {String | Number} value
 * @param {String | Number} inputValue
 * @returns {void}
 */
module.exports = function createMovement(target, move, value, inputValue) {
    
    if (move === 'click') target.click()
    else if (move === 'input') {
        target.value = inputValue || value
    }
}