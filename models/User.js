const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },

  movies_watched: [
    {
      title: {
        type: String,
      },
      movie_id: {
        type: Number,
      },
   
      movie_genres: [
        {
          type: Array
        }
      ],
      poster: {
        type: String,
      },
      movie_runtime: {
        type: Number
      },
    },
  ],

  movies_watched_theater: [
    {
      title: {
        type: String,
      },
      movie_id: {
        type: Number,
      },
   
      movie_genres: [
        {
          type: Array
        }
      ],
      poster: {
        type: String,
      },
      movie_runtime: {
        type: Number
      },
    },
  ]
});

// $group, $match, $aggregate

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
}
  
const User = mongoose.model("User", UserSchema);

module.exports = User;
