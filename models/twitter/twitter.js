import mongoose from 'mongoose'
import {list} from '../../initData/twitter'
const Schema = mongoose.Schema;

const keywordSchema = new Schema({
    data: {}        
})
    

const keywords = mongoose.model('keywords',keywordSchema)
keywords.findOne((err,data) => {
    if (!data) {
        for(let item of list) {
            keywords.create({data: item})
        }
    }
})


module.exports = keywords; 