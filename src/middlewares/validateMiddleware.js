export default function validate(schema){
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }catch (err){
            next(err);
        }
    };
};