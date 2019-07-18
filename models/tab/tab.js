import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const tabSchema = new Schema({
        id: Number,
        value: String,
    })

//mongoose会对model名字加s,尽量写成复数。
const tab = mongoose.model('tab',tabSchema,'tab')

export default tab; 