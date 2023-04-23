const {
  addBooktoHandler,
  getAllBookByHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookByHandler
} = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooktoHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookByHandler
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookHandler
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByHandler
  }
]

module.exports = routes
