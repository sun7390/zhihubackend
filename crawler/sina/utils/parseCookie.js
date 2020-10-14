const trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

export const convertCookie = (cookie) => {
    const cookieArr = cookie.split(";");
    let cookieObj = {};
    for (const item of cookieArr) {
        const s = item.split("=");
        cookieObj[trim(s[0])] = s[1];
    }
    return cookieObj;
}