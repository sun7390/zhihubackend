import imageModel from '../../models/tabImage/tabImage'
var fs = require('fs')

class tabImage{
    constructor() {
        this.read_directory = this.read_directory.bind(this)
        this.fetchImage = this.fetchImage.bind(this)
    }
    async read_directory(req,res,next) {
        fs.readdir('./public/images',(err,files) => {
            let images = [];
            (function iterator(i) {
                if(i === files.length) {
                    return 
                }
                let path = './public/images/' + files[i]
                let data = fs.readFileSync(path,'base64',(err,data) => {
					if(err) {
						res.send({
                            status: 0,
                            error_message: err
                        })
                        return 
					}else {
                        let datauri = 'data:image/jepg;base64,' + data
                        return datauri;
                    }
                })
                images.push(data)
                iterator(i+1)  
            })(0)
            res.send({
                status: 1,
                images: images
            })
        })
    }
    fetchImage(req,res,next) {
        imageModel.find({},{_id: 0},(err,data) => {
            if(err) {
               return res.sendStatus(500).json({errors: err, message: 'Internal server error'})
            }else{
                res.send({
                    status: 0,
                    data
                })
            }
        })
    }

}

module.exports =  new tabImage();