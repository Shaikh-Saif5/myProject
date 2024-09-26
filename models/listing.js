const mongoose = require("mongoose");
const reviews = require("./review");
const { string } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    // type: String,
    //   "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    // set: (v) =>
    //   v === ""
    //     ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    //     : v,
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews :[
    {
      type : Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner:{
     type : Schema.Types.ObjectId,
      ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  }
});


//mongoose post middleware 
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await reviews.deleteMany({_id :{$in :listing.reviews}})
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;