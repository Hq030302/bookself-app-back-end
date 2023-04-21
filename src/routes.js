const { addBooktoHandler } = require('./handler');

const routes = [{
    method: 'POST',
    path: './books',
    handler: addBooktoHandler,
}];

module.exports = routes;