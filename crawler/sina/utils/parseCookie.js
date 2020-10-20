const trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

export const convertCookie = (cookie) => {
    const cookieArr = cookie.split(";");
    let cookieParams = [];
    for (const item of cookieArr) {
        const s = item.split("=");
        cookieParams.push({
            name: trim(s[0]),
            value: s[1],
            path: '/',
            domain: '.weibo.com'
        })
    }
    return cookieParams;
}