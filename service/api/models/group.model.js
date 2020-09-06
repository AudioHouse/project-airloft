const mongoose = require('../../common/connectors/mongoose.connector').mongoose;
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, unique: true, required: [true, 'Group name cannot blank']},
    password: {type: String, required: [true, 'Group password cannot be blank']},
    quota: {type: Number, required: [true, 'Group quota cannot be blank'], min: 0},
    isAdmin: {type: Boolean, required: [true, 'Must define group role']},
    isLocked: {type: Boolean, required: [true, 'Must define if account is locked or not']}
});

groupSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
groupSchema.set('toJSON', {
    virtuals: true
});

const Group = mongoose.model('Groups', groupSchema);

exports.createGroup = (groupData) => {
    console.log(`INFO: Persisting new group: ${JSON.stringify(groupData)}`)
    const group = new Group(groupData);
    return group.save().catch(reason => {
        console.log(`ERROR: Could not create new group. Reason: "${reason}"`);
        return {processingError: reason};
    });
};

exports.findGroupById = (id, hidePass) => {
    console.log(`INFO: Retrieving group with id: ${id}`)
    return Group.findById(id).then(result => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        if (hidePass) delete result.password;
        return result;
    }).catch(reason => {
        console.log(`ERROR: Could not get group by id. Reason: "${reason}"`);
        return undefined;
    });
};

exports.patchGroupById = (id, newGroupData) => {
    console.log(`INFO: Updating group with id: ${id}`);
    return Group.findByIdAndUpdate(id, newGroupData).then(result => {
        if (result === null) throw `Bad Request. Group ${id} does not exist`;
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        delete result.password;
        return result;
    }).catch(reason => {
        console.log(`ERROR: Could not update group by id. Reason: "${reason}"`);
        return {processingError: reason};
    });
};

exports.getAllGroups = () => {
    console.log('INFO: Fetching all groups in database')
    return Group.find().then(result => {
        let groupArray = [];
        for (let index in result) {
            let groupCopy = {...result[index]._doc};
            groupCopy.id = groupCopy._id;
            delete groupCopy._id;
            delete groupCopy.__v;
            delete groupCopy.password;
            groupArray.push(groupCopy);
        }
        return groupArray;
    }).catch(reason => {
        console.log(`ERROR: Could not retrieve all groups. Reason: "${reason}"`);
        return {processingError: reason};
    });
}

exports.deleteGroupById = (id) => {
    console.log(`INFO: Deleting group with Id: ${id}`);
    // TODO: Check to make sure group has no outstanding resources
    /* If a group owns applications, functions, and services, all of those
    must be deleted before a group can successfuly be deleted. */
    
    return Group.remove({_id: id}).catch(reason => {
        return {processingError: reason};
    });
};