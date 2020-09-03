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
    console.log(`Persisting new group: ${JSON.stringify(groupData)}`)
    const group = new Group(groupData);
    return group.save();
};

exports.findGroupById = (id, hidePass) => {
    console.log(`Retrieving group with id: ${id}`)
    return Group.findById(id).then(result => {
        result = result.toJSON();
        result.groupId = id;
        delete result._id;
        delete result.__v;
        if (hidePass) delete result.password;
        return result;
    }).catch(reason => {
        console.log(`ERROR: Could not get group by id. Reason: "${reason}"`);
        return undefined;
    });
};