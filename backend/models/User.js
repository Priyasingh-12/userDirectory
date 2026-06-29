const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema(
    {
   name:{
      type:String,
      required:[true, 'Name is required'],
      trim:true,
      minlength:[2,'Name must be at least 2 characters'],
      maxlength:[30,'Name must not exceed 100 characters']
   },
   email:{
      type:String,
      required:[true, 'Email is required'],
      trim:true,
       match: [
        /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
      unique:true,
      lowercase:true
   },
   phone:{
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      length:10,
        match: [
        /^\+?[\d\s\-().]{7,20}$/,
        'Please provide a valid phone number',
      ],
    },
    company:{
        type:String,
        trim: true,
       maxlength: [150, 'Company name must not exceed 150 characters'],
       default: null,
    },
     createdAt:{
             type: Date,
      default: Date.now,
      immutable: true,

       }



    }
)

  module.exports = mongoose.model("User", userSchema);
