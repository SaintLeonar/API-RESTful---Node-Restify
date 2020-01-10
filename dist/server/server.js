"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
class Server {
    initRoutes() {
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
                        let error = new Error();
                        error.statusCode = 400;
                        error.message = 'Please, update your browser';
                        return next(error);
                    }
                    resp.json({
                        browser: req.userAgent(),
                        method: req.method,
                        url: req.url,
                        path: req.path(),
                        query: req.query // Parametros de URL
                    });
                    return next();
                });
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
    bootstrap() {
        return this.initRoutes().then(() => this);
    }
}
exports.Server = Server;
