const validUrl = require('valid-url')

const validateUrl = (url) => {
    const valid = validUrl.isUri(url)
    console.log(url, valid)
    if (valid) {
        return url
    } else {
        const e = new Error('Invalid URL')
        e.status = 400
        throw e
    }
}

module.exports = validateUrl
