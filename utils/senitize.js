const sanitizeHtml = require('sanitize-html');

const sanitizeTaxt = (taxt) => {
    taxt = taxt.trim() ?? '';
    if (taxt == '') {
        return taxt;
    }
    taxt = sanitizeHtml(taxt, {
        allowedTags: [],
        allowedAttributes: {}
    })
    return taxt;
}

module.exports = sanitizeTaxt;