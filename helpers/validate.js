const {
    Types: { ObjectId },
} = require("mongoose");

validate = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.message);
        }
        next();
    };
};

validateId = (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send("Id is not valid");
    }

    next();
};

module.exports = {
    validate,
    validateId,
};
