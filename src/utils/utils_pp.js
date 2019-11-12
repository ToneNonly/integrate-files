module.exports = {
    wrapCallback(wrap) {
        return function (callback, ...args) {
            callback.apply(null, args)
            wrap()
        }
    },
    getFileAbsolutePath (dirname = process.cwd()) {
        return function getFileAbsolutePath(relativePath) {
            return `${dirname}${relativePath}`
        }
    }
}