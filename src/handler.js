const {nanoid} = require("nanoid")
const books = require('./books')
const {responseSuccess, responseFailed} = require('./response')

const addBooks = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload

    if (name === undefined) {
        return responseFailed('fail', 'Gagal menambahkan buku. Mohon isi nama buku', 400, h)
    } else if (readPage > pageCount) {
        return responseFailed(
            'fail',
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            400,
            h
        )
    }

    const id = nanoid(16)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }

    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        })

        response.code(201)
        return response
    }

    return responseFailed('fail', 'Buku gagal ditambahkan', 500, h)
}

const getAllBooks = (request, h) => {

    const {name, reading, finished} = request.query
    let filterBooks = books

    //if request query name exist
    if (name) {
        //filter books where books.name contain request query name
        filterBooks = filterBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
    }

    //if request query reading exist
    if (reading) {
        //filter books where books.reading equals request query reading
        filterBooks = filterBooks.filter((book) => book.reading === !!Number(reading))
    }

    //if request query finished exist
    if (finished) {
        //filter books where books.finished equals request query finished
        filterBooks = filterBooks.filter((book) => book.finished === !!Number(finished))
    }

    const response = h.response({
        status: 'success',
        data: {
            books: filterBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    })

    response.code(200)
    return response

}

const getBookById = (request, h) => {
    const {bookId} = request.params
    const book = books.filter((n) => n.id === bookId)[0]
    if (book) {
        const response = h.response({
            status: 'success',
            data: {
                book: book
            }
        })

        response.code(200)
        return response
    }

    return responseFailed('fail', 'Buku tidak ditemukan', 404, h)

}

const editBookById = (request, h) => {
    const {bookId} = request.params
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload

    if (name === undefined) {
        return responseFailed('fail', 'Gagal memperbarui buku. Mohon isi nama buku', 400, h)
    } else if (readPage > pageCount) {
        return responseFailed(
            'fail',
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            400,
            h
        )
    }

    const updatedAt = new Date().toISOString()
    const finished = readPage === pageCount
    const index = books.findIndex((book) => book.id === bookId)

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
            finished,
            reading,
            updatedAt
        }

        return responseSuccess('success', 'Buku berhasil diperbarui', 200, h)
    }

    return responseFailed('fail', 'Gagal memperbarui buku. Id tidak ditemukan', 404, h)
}

const deleteBooksById = (request, h) => {
    const {bookId} = request.params
    const index = books.findIndex(book => book.id === bookId)

    if (index !== -1) {
        books.splice(index, 1)
        return responseSuccess('success', 'Buku berhasil dihapus', 200, h)
    }

    return responseFailed('fail', 'Buku gagal dihapus. Id tidak ditemukan', 404, h)
}

module.exports = {addBooks, getAllBooks, getBookById, editBookById, deleteBooksById}