import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                   throw new Error('Invalid Email') 
            }
        }
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}\d{4}\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required'],
        trim:true
      }
    ,
    password:{
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword( value , [{ minLength: 8,minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}] )){
                throw new Error('your password must Hav atleast one synbol,one uppercase and one lowercase') 
            }
        }
},
    isAdmin: {
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})

userSchema.methods.matchPassword = async function(enteredPasseord){
    return await bcrypt.compare(enteredPasseord, this.password)
}
userSchema.pre('save',async function(next){
    if (!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
const User = mongoose.model('User', userSchema)
export default User;