import mongoose from "mongoose"

const validateEmail = function (email) {
    const re = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    full_name:{
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        toLowerCase: true,
        validate: [validateEmail, 'Invalid email format'],
    },
    phone_number:{
        type:Number,
        required: false,
        unique: true,
        validate: {
            validator: function validatePhone() {
                return this.phoneNr >= 1000000000 && this.phoneNr <= 9999999999;
            },
            message: 'Phone number must be exactly 10 digits.',
        },
    },
    username:{
        type: String,
        required: true,
        unique: true,
        toLowerCase: true
    },
    age:{
        type:Number,
        required: true
    },
    gender:{
        type:String,
        required: false
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isVerified:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

const User = new mongoose.model("User", userSchema);

export default User;