const validUrl = require('valid-url')

const validateUrl = (url) => {
    //this is actually just checking the the url is a valid uri
    //not all valid uri's are valid url's, but this is a pretty good start
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
