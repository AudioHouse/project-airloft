const mongoose = require('../../common/connectors/mongoose.connector').mongoose;
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    password: String,
    quota: Number,
    isAdmin: Boolean,
    isLocked: Boolean
})

const Group = mongoose.model('Groups', groupSchema);

exports.createGroup = (groupData) => {
    const group = new Group(groupData);
    return group.save();
};

