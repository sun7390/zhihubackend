import mongoose from 'mongoose'
import imageList from '../../initData/tabImage'

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    data: {}
})

const images = mongoose.model('images',imageSchema)

images.findOne((err,data) => {
    if (!data) {
        images.create({data: imageList})
    }
})
module.exports = images

