const books = require('./books')
const { nanoid } = require('nanoid')

const addBooktoHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updateAt = insertedAt
  const finished = (pageCount === readPage)

  const newBooks = { id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updateAt }
  books.push(newBooks)

  const itSuccess = books.filter((book) => book.id)

  if (itSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBookByHandler = () => {
  return {
    status: 'success',
    data: {
      books
    }
  }
}

const getBookByIdHandler = (request, h) => {
  const { id } = request.params
  const book = books.filter((b) => b.id === id)

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku yang dicari tidak ditemukan!'
  })
  response.code(404)
  return response
}

const updateBookHandler = (request, h) => {
  const { id } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const updateAt = new Date().toISOString()
  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updateAt
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diubah'
    })
    response.code(200)
    return response
  }
}

const deleteBookByHandler = (request, h) => {
  const { id } = request.params
  const index = books.findIndex((book) => (book.id) === id)

  if (index !== -1) {
    books.splice(books[index], 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus!'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addBooktoHandler,
  getAllBookByHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookByHandler
}
