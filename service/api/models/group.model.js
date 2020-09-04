const mongoose = require('../../common/connectors/mongoose.connector').mongoose;
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, unique: true, required: [true, 'Group name cannot blank']},
    password: {type: String, required: [true, 'Group password cannot be blank']},
    quota: {type: Number, required: [true, 'Group quota cannot be blank'], min: 0},
    isAdmin: {type: Boolean, required: [true, 'Must define group role']},
    isLocked: {type: Boolean, required: [true, 'Must define if account is locked or not']}
})

groupSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
groupSchema.set('toJSON', {
    virtuals: true
});

const Group = mongoose.model('Groups', groupSchema);

exports.createGroup = (groupData) => {
    console.log(`Persisting new group: ${JSON.stringify(groupData)}`)
    const group = new Group(groupData);
    return group.save().catch(reason => {
        console.log(`ERROR: Could not create new group. Reason: "${reason}"`);
        return {processingError: reason};
    });
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