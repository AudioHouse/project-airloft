import mongoose from '../../common/connector/mongoose.service'
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    password: String,
    quota: Number,
    permssion: Number
})

const Group = mongoose.model('Groups', groupSchema);