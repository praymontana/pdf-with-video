const loaderUtils = require('loader-utils');

module.exports = function(source) {
    let options = loaderUtils.getOptions(this);
    let url_transform = options.url_transform || function(u) {
        return u;
    };

    return source.replace(/url\(([^)]*)\)/g, function(match, p1) {
        let bracket = '';
        if (p1.length >= 2) {
            let first_symbol = p1[0];
            let last_symbol = p1[p1.length - 1];
            if (first_symbol === '"' || first_symbol === "'" && first_symbol === last_symbol) {
                bracket = first_symbol;
                p1 = p1.substr(1, p1.length - 2);
            }
        }

        return `url(${bracket}${url_transform(p1)}${bracket})`;
    });
}
