export default function authMiddleware(req, res, next){
    try{
    
    next();
    }catch (err){
    next(err);
    }
};