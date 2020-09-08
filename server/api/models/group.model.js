const mongoose = require('../../common/connectors/mongoose.connector').mongoose;
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: {
        type: String,
        unique: true,
        required: [true, 'Group name cannot blank']
    },
    password: {
        type: String,
        required: [true, 'Group password cannot be blank']
    },
    quota: {
        type: Number,
        required: [true, 'Group quota cannot be blank'],
        min: 0
    },
    isAdmin: {
        type: Boolean,
        required: [true, 'Must define group role']
    },
    isLocked: {
        type: Boolean,
        required: [true, 'Must define if account is locked or not']
    }
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
    return new Promise((resolve, reject) => {
        console.log(`INFO: Persisting new group: ${JSON.stringify(groupData)}`)
        const group = new Group(groupData);
        group.save().then(result => {
            resolve(result);
        }).catch(reason => {
            console.log(`ERROR: Could not create new group. Reason: "${reason}"`);
            reject(reason);
        });
    });
};

exports.findGroupById = (id, hidePass) => {
    return new Promise((resolve, reject) => {
        console.log(`INFO: Retrieving group with id: ${id}`)
        Group.findById(id).then(result => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            if (hidePass) delete result.password;
            resolve(result);
        }).catch(reason => {
            console.log(`ERROR: Could not get group by id. Reason: "${reason}"`);
            reject(reason);
        });
    });
};

exports.findGroupByName = ((name, hidePass) => {
    return new Promise((resolve, reject) => {
        console.log(`INFO: Retreiving group with name: ${name}`);
        Group.find({ groupName: name }).then(result => {
            console.log(`INFO: Found group with name: ${name}`);
            resolve(result[0]);
        }).catch(reason => {
            console.log(`ERROR: Could not find group with name: ${name}. Reason: ${reason}`);
            reject(reason);
        });
    });
});

// exports.findGroupByName = ((name, hidePass) => {
//     return new Promise((resolve, reject) => {
//         console.log(`INFO: Retreiving group with name: ${name}`);
//         let result = Group.find({ groupName: name });
//         console.log(result);
//         if (!result[0]) {
//             console.log(`ERROR: Could not find group with name: ${name}`);
//             reject(`Could not find group with name: ${name}`);
//         } else {
//             console.log(`INFO: Found user with name: ${name}`)
//             resolve(result[0]);
//         }
//     });
// });

exports.patchGroupById = (id, newGroupData) => {
    return new Promise((resolve, reject) => {
        console.log(`INFO: Updating group with id: ${id}`);
        Group.findByIdAndUpdate(id, newGroupData).then(result => {
            if (result === null) throw `Bad Request. Group ${id} does not exist`;
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            delete result.password;
            resolve(result);
        }).catch(reason => {
            console.log(`ERROR: Could not update group by id. Reason: "${reason}"`);
            reject(reason);
        });
    });
};

exports.getAllGroups = () => {
    return new Promise((resolve, reject) => {
        console.log('INFO: Fetching all groups in database')
        Group.find().then(result => {
            let groupArray = [];
            for (let index in result) {
                let groupCopy = { ...result[index]._doc };
                groupCopy.id = groupCopy._id;
                delete groupCopy._id;
                delete groupCopy.__v;
                delete groupCopy.password;
                groupArray.push(groupCopy);
            }
            resolve(groupArray);
        }).catch(reason => {
            console.log(`ERROR: Could not retrieve all groups. Reason: "${reason}"`);
            reject(reason);
        });
    });
}

exports.deleteGroupById = (id) => {
    return new Promise((resolve, reject) => {
        console.log(`INFO: Deleting group with Id: ${id}`);
        // TODO: Check to make sure group has no outstanding resources
        /* If a group owns applications, functions, and services, all of those
        must be deleted before a group can successfuly be deleted. */

        return Group.remove({ _id: id }).then(result =>{
            resolve(result);
        }).catch(reason => {
            reject(reason);
        });
    });
};