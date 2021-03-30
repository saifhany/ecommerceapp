import bcrypt from 'bcryptjs';
const users = [
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('1232131',10),
        isAdmin:true
    },
    {
        name:'first User',
        email:'first@example.com',
        password:bcrypt.hashSync('1232131',10),
    },
    {
        name:'second User',
        email:'second@example.com',
        password:bcrypt.hashSync('1232131',10),
    }
]
export default users;