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
  const updatedAt = insertedAt
  const finished = (pageCount === readPage)

  const newBooks = { id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt }
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

const getAllBookByHandler = (request, h) => {
  const { name, reading, finished } = request.query

  if (name !== undefined) {
    const booksnamefilter = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()))
    const response = h.response({
      status: 'success',
      data: {
        books: booksnamefilter.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })
    response.code(200)
    return response
  } else if (reading !== undefined) {
    const booksread = books.filter(
      (book) => Number(book.reading) === Number(reading)
    )

    const response = h
      .response({
        status: 'success',
        data: {
          books: booksread.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
          }))
        }
      })
    response.code(200)
    return response
  } else if (finished !== undefined) {
    const booksfinished = books.filter(
      (book) => Number(book.finished) === Number(finished)
    )

    const response = h
      .response({
        status: 'success',
        data: {
          books: booksfinished.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
          }))
        }
      })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })
    response.code(200)
    return response
  }
}

const getBookByIdHandler = (request, h) => {
  const { id } = request.params
  const book = books.filter((n) => n.id === id)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
  }
}

const updateBookHandler = (request, h) => {
  const { id } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const updatedAt = new Date().toISOString()
  const index = books.findIndex((book) => book.id === id)

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
  } else if (index !== -1) {
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
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
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
      message: 'Buku berhasil dihapus'
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
