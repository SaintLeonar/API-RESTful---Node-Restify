import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from './users.model';

class UsersRouter extends Router {
	applyRoutes(application: restify.Server) {
		application.get('/users', (req, resp, next) => {
			User.findAll().then((users) => {
				resp.json(users);
				return next();
			});
		});

		application.get('/users/:id', (req, resp, next) => {
			User.findById(req.params.id).then((user) => {
				if (user) {
					// se encontrou o usuario
					resp.json(user);
					resp.status(200);
					return next();
				}

				let error: any = new Error();
				error.statusCode = 404;
				error.message = 'Usuário não encontrado';
				return next(error);
			});
		});
	}
}

export const usersRouter = new UsersRouter();
