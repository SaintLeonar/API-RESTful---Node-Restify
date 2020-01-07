import * as restify from 'restify';

// CRIA O SERVIDOR
const server = restify.createServer({
	name: 'meat-api',
	version: '1.0.0'
});

// PROCESSAMENTO DE REQUISIÇÃO E RESPOSTA
server.get('/hello', (req, resp, next) => {
	resp.json({ message: 'hello' });
	return next();
});

// DEFINIÇÃO DA PORTA
server.listen(3000, () => {
	console.log('API is running on http://localhost:3000');
});
