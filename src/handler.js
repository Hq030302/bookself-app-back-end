const books = require('./books');
const nanoid = require('nanoid');

const addBooktoHandler = (request,h) => {
    const {name, year, author, summary, publisher, pageCount, readPage,reading} = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;
    const finished = readPage===pageCount;

    const Newbooks = {name,year,author,summary,publisher,pageCount,readPage,reading,finished,insertedAt,updateAt};
    books.push(Newbooks);

    const itSuccess = books.filter((book)=>book.id);
    if(!name) {
        const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku"
    });
    response.code(404);
    return response;  
    } 

    if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
      }

    if(itSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            } 
        });
        response.code(201);
        return response;
    }
};


module.exports = addBooktoHandler;