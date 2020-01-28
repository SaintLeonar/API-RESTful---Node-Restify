import * as restify from 'restify';
import { environment } from '../common/environment';
import { Router } from '../common/router';
import * as mongoose from 'mongoose';

export class Server {
	application: restify.Server;

	initializeDb(): mongoose.MongooseThenable {
		(<any>mongoose).Promise = global.Promise;
		return mongoose.connect(environment.db.url, {
			useMongoClient: true
		});
	}

	initRoutes(routers: Router[]): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				// CRIA O SERVIDOR
				this.application = restify.createServer({
					name: 'meat-api',
					version: '1.0.0'
				});

				// Instalando plugins de parse
				this.application.use(restify.plugins.queryParser());
				this.application.use(restify.plugins.bodyParser());

				//Percorre o array de rotas e aplicando cada uma delas
				for (let router of routers) {
					router.applyRoutes(this.application);
				}

				// DEFINIÇÃO DA PORTA
				this.application.listen(environment.server.port, () => {
					resolve(this.application);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/*
		Método bootstrap é o método de chamada principal da aplicação.
		Nos parâmentros recebe: Um array de rotas dos recursos (default: vazio)
		O método é do tipo Promisse<Server>
		Retorna a inicialização do Banco de Dados e
		        a inicialização de todas as rotas da aplicação
	*/
	bootstrap(routers: Router[] = []): Promise<Server> {
		return this.initializeDb().then(() =>
			this.initRoutes(routers).then(() => this)
		);
	}
}
