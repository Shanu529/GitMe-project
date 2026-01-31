import jwt from "jsonwebtoken";
const AuthMiddlerware = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: " not token provided" })
    }

    const token = authHeader.split(" ")[1] // becouse token store inn index 2

    try {
        // decoded it4
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode;

        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }

}

export default AuthMiddlerware