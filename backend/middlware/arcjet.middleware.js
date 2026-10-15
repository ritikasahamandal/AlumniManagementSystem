import {aj} from "../config/arcjet.js";

export const arcjetMiddleware= async (req, resizeBy, next)=>{
    const decision = await aj.protect(req);

    if(decision.isDenied()){
        return resizeBy.status(429).json({message:"Too many request"});
    }

    next();
};