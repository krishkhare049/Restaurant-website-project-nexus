const jwt = require("jsonwebtoken");
const { JWT_secret_key } = process.env;

const createToken = async (data) => {
    // const token = await jwt.sign({
    //     _id: '1234567890', name: 'Krish Khare'
    // }, JWT_secret_key, { expiresIn: "2 seconds" });
    // console.log(token);
    const token = await jwt.sign({
        data
    }, JWT_secret_key);
    console.log(token);
};

// const verifyToken = async (token) => {
//     const decodejwt = await jwt.verify(token, JWT_secret_key);
//     // console.log(decodejwt);
//     return decodejwt;
// };

const verifyToken = async (token) => {

    try {
        
        // const decodejwt = await jwt.verify(token, JWT_secret_key);
        const decodejwt = await jwt.verify(token, JWT_secret_key, function (err, decode){
            if(err){
                // console.log(err);
                // console.log("Error while decoding jwt");
                return "err_while_verifying_jwt";
            }
            else{
                // console.log(decode);
                return decode;
            }
        });
        // console.log(decodejwt);
        return decodejwt;

    } catch (error) {
        console.log(error);
        console.log("Cannot verify, Invalid signature");
    }

};

module.exports = {
    createToken, verifyToken
};