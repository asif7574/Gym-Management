import jwt from 'jsonwebtoken'

export const generateTokenAdmin = (admin,role) => {
    try {
        var token = jwt.sign({ id: admin._id, name: admin.name, role },process.env.JWT_KEY);
        return token
    } catch (error) {
        console.log(error);
    }
};

// export const generateToken=(employee,control_role)=>{

//     try {
//         var token = jwt.sign({ id: employee._id, control_role:control_role }, process.env.JWT_KEY);
//         return token
//     } catch (error) {
        
//     }
// }
// export const generateTokenforadmin=()=>{

//     try {
//         var token = jwt.sign({ id: 'admin' }, process.env.JWT_ADMIN_KEY);
//         return token
//     } catch (error) {
        
//     }
// }