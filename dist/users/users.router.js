"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find().then((users) => {
                resp.json(users);
                return next();
            });
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then((user) => {
                if (user) {
                    // se encontrou o usuario
                    resp.json(user);
                    return next();
                }
                resp.status(404);
                return next();
            });
        });
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            resp.status(201);
            user.save().then((user) => {
                user.password = undefined;
                resp.json(user);
                return next();
            });
        });
        application.put('/users/:id', (req, resp, next) => {
            const options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec()
                .then((result) => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id).exec();
                }
                else {
                    resp.send(404);
                }
            })
                .then((user) => {
                resp.json(user);
                return next();
            });
        });
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).then((user) => {
                // se user existir
                if (user) {
                    resp.json(user);
                    return next();
                }
                else {
                    resp.send(404);
                }
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
