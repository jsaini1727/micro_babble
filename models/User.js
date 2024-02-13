// Import 'model' and 'Schema' from mongoose
const { model, Schema } = require('mongoose');

// Import 'hash' and 'compare' from bcrypt
const { hash, compare } = require('bcrypt');

// Create the userSchema with the following criteria
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'You must enter a username'],
      minlength: [2, 'You must enter a username that is 2 characters long']
    },


    email: {
      type: String,
      unique: true,
      required: [true, 'You must enter a valid email'],
      validate: {
        validator(val) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig.test(val);
        },
        message: 'Your email address is not formatted correctly'
      }
    },
    password: {
      type: String,
      required: [true, 'You must enter a password'],
      minlength: [9, 'You must enter a password that is 9 characters long'],

    }

  });

// Use the userSchema.set() method to hash the password on new user creation or on password update
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  // This function is to save the new values. if we do not have this then the values will not be stored
  next();
});

userSchema.methods.validatePass = async function (formPassword) {
  const is_valid = await compare(formPassword, this.password);

  return is_valid;
}
// Use the userSchema.methods property to create a custom instance method called 'validatePass' that takes a form password and compares it to the user's hashed password to return a boolean true if they match

userSchema.set('toJSON', {
  transform: (_, user) => {
    delete user.password;
    delete user.__v;
    return user;
  }
});

// Create the 'User' model variable using the model function from mongoose

const User = model('User', userSchema);


// * Export the model

module.exports = User;
