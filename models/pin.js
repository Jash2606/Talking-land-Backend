const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  title: { type: String, default: '' },
  story: { type: String, default: '' },
  image: { 
    data: Buffer,  // Binary data for the image
    contentType: String, // MIME type of the image
  },
  address: { type: String, default: '' },
});

module.exports = mongoose.model('Pin', PinSchema);


