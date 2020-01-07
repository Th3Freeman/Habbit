const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { petSchema } = require("./pet");
const { todoSchema } = require("./todo");

const UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: "First and last name is required"
  },
  email: {
    type: String,
    trim: true,
    required: "Email address is required"
  },
  password: {
    type: String,
    trim: true,
    required: "A password is required",
    validate: [
      function(input) {
        return input.length >= 4;
      },
      "Password should be four characters or longer"
    ]
  },
  todos: [todoSchema],
  pet: petSchema,


});

class newUser {
  constructor({ _id, fullName, email, password, pet, todos }) {
    this._id = _id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.todos = todos;
    this.pet = pet;
  }

  comparePassword(challenge) {
    return bcrypt.compare(this.password, challenge)
  }
}

UserSchema.loadClass(newUser);
let User = mongoose.model("User", UserSchema);

module.exports = User;
