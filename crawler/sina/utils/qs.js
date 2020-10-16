export const qsParse = (string) => {
    const parseArray = string.split("&");
    let parseObj = {};
    for (const item of parseArray) {
        const s = item.split("=");
        parseObj[s[0]] = s[1];
    }
    return parseObj;
}