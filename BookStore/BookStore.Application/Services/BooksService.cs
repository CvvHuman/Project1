using BookStore.Core.Models;
using BookStore.DataAccess.Repos;
using System.Net;

namespace BookStore.Application.Services
{
    public class BooksService : IBooksService
    {
        private readonly IBooksRepos _booksRepos;

        public BooksService(IBooksRepos booksRepos)
        {
            _booksRepos = booksRepos;
        }

        public async Task<List<Book>> GetAllBooks()
        {
            return await _booksRepos.Get();
        }

        public async Task<Guid> CreateBook(Book book)
        {
            return await _booksRepos.Create(book);
        }

        public async Task<Guid> UpdateBook(Guid id, string title, string description, string author, string address)
        {
            return await _booksRepos.Update(id, title, description, author, address);
        }

        public async Task<Guid> DeleteBook(Guid id)
        {
            return await _booksRepos.Delete(id);
        }

        public async Task<List<Book>> SearchBooksByTitle(string title)
        {
            return await _booksRepos.Search(title);
        }
    }
}
