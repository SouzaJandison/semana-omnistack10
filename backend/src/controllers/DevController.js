const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    // Listar Devs
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    // Cadastra novo Dev
    async store(request, response){
        const { githubUsername, techs, latitude, longitude} = request.body;
        
        //Verifica se Dev a ser cadastrado está na base dados
        let dev = await Dev.findOne({ github_username: githubUsername })

        if(!dev){
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            const apiResponse = await axios.get(`https://api.github.com/users/${githubUsername}`)
            let { name = login, avatar_url, bio, login} = apiResponse.data;
        
            dev = await Dev.create({
                github_username: githubUsername,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            // Filtrar as Conexões dentro de uma área de 10Km de distância
            // Possui pelo menos uma techs pesquisada
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        return response.json(dev);
    },
}