const {Schema, model} = require('mongoose')

const schema = new Schema({
    content: {type: String, required: true},
    pageId :{type: Schema.Types.ObjectId, ref:'User'},
    UserId :{type: Schema.Types.ObjectId, ref:'User'},
}, {
    timestamps: {'createdAt': 'created_at'}
})

module.exports = model('Comment', schema)