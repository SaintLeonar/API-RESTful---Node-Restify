import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from './users.model';
import * as mongoose from 'mongoose';

class UsersRouter extends Router {
	applyRoutes(application: restify.Server) {
		application.get('/users', (req, resp, next) => {
			User.find().then((users) => {
				resp.json(users);
				return next();
			});
		});

		application.get('/users/:id', (req, resp, next) => {
			User.findById(req.params.id).then((user) => {
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
			let user = new User(req.body);
			resp.status(201);
			user.save().then((user) => {
				user.password = undefined;
				resp.json(user);
				return next();
			});
		});
	}
}

export const usersRouter = new UsersRouter();
