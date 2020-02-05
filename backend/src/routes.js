const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();

routes.get('/devs', DevController.index); // Listar Devs
routes.post('/devs', DevController.store); // Cadastra Dev
routes.get('/search', SearchController.index); // Pesquisar Devs

module.exports = routes;