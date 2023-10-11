const User = require('../models/user')

async function  validateUser( email){
    console.log(email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return false
    }else{
        return true
    }
}

module.exports = validateUser