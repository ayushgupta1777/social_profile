const mongoose =require('mongoose');

const user =new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
        min: 100,
        max: 999,
      },
    username: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },
})
const modeluser =mongoose.model('User', user);
module.exports ={ modeluser }