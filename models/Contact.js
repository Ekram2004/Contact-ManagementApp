const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
        phone: {
            type: String,
            required: true,
        },
    address: String,
        notes: {
            type: String,
            default: " ",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);