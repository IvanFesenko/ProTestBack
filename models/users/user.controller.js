const User = require('./User');

class UsersController {
    constructor() {}
    get testController() {
        return this._testController.bind(this);
    }

    async _testController(req, res, next) {
        try {
            console.log('hello');
            res.json({
                message: 'hello this is test endPoint',
            }).status(200);
        } catch (err) {
            console.log(err);
        }
    }
}

const userController = new UsersController();
module.exports = userController;
