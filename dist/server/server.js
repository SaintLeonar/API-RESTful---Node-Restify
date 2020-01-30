"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
const mongoose = require("mongoose");
const merge_patch_parser_1 = require("./merge-patch.parser");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
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
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                //Percorre o array de rotas e aplicando cada uma delas
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                // DEFINIÇÃO DA PORTA
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
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
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
