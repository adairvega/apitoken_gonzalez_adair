const { User } = require('../../db/connection');
import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({message: "No se proporcionó el token"});
    }else{
        try {
            const decoded = jwt.verify(token,config.SECRET);
            const user = await User.findOne({where: {id: decoded.id}});
            if (!user) {
                return res.status(404).json({message: "El usuario no existe"});
            }
            next();
        } catch (error) {
            return res.status(401).json({message: "Token no valido"});
        }   
    }
}