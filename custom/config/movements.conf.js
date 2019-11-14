module.exports = {
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
}