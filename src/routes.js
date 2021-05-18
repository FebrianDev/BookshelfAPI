const {addBooks,getAllBooks, getBookById, editBookById, deleteBooksById} = require('./handler')
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooks
    },
    {
        method: 'GET',
        path: '/books',
        handler:getAllBooks
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler:getBookById
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler:editBookById
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler:deleteBooksById
    }
]

module.exports = routes