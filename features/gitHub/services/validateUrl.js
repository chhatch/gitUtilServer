const validUrl = require('valid-url')

const validateUrl = url => {
const valid = validUrl.isUri(url)
    if (valid) {
return url
    } else {
    const e =  new Error('Invalid URL')}
    e.status = 400
}
