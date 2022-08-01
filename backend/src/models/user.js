import mongoose from 'mongoose';
  const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: username => User.doesNotExist({ username }),
      message: "Username already exists"
    }
  }
}, { timestamps: true });
UserSchema.pre('save', function () {

  });
  UserSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
  };

  const User = mongoose.model('User', UserSchema);
  export default User;