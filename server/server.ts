import * as restify from 'restify';
import { environment } from '../common/environment';

export class Server {
	application: restify.Server;

	initRoutes(): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				// CRIA O SERVIDOR
				this.application = restify.createServer({
					name: 'meat-api',
					version: '1.0.0'
				});

				this.application.use(restify.plugins.queryParser());

				//rotas

				this.application.get('/info', (req, resp, next) => {
					if (req.userAgent().includes('MSIE 7.0')) {
						//resp.status(400);
						//resp.json({ message: 'Please, update your browser' });

						let error: any = new Error();
						error.statusCode = 400;
						error.message = 'Please, update your browser';
						return next(error);
					}

					resp.json({
						browser: req.userAgent(), // Informações do sistema e browser/software de requisição
						method: req.method, // Informações do método utilizado
						url: req.url, // URL do browser
						path: req.path(), // Caminho/ Rota da requisição
						query: req.query // Parametros de URL
					});
					return next();
				});

				// DEFINIÇÃO DA PORTA
				this.application.listen(environment.server.port, () => {
					resolve(this.application);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	bootstrap(): Promise<Server> {
		return this.initRoutes().then(() => this);
	}
}
