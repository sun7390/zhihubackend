const fs = require('fs')
let components = []
const files = fs.readdirSync('./crawler/sina/analysisData/')
files.forEach(function(item, index) {
    console.log(item);
    let stat = fs.lstatSync("./crawler/sina/analysisData/" + item)
    if (stat.isDirectory() === true) {
        components.push({
            path: item
        })
    }
})

console.log(components);