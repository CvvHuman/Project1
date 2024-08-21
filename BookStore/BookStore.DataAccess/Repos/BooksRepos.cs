using BookStore.Core.Models;
using BookStore.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.DataAccess.Repos
{
    public class BooksRepos: IBooksRepos
    {
        private readonly BookstoreDbContext _context;
        public BooksRepos(BookstoreDbContext context)
        {
            _context = context;
        }

        public async Task<List<Book>> Get()
        {
            var bookEntities = await _context.Books.AsNoTracking().ToListAsync();

            var books = bookEntities.Select(b => Book.Create(b.Id,b.Title,b.Description,b.Author,b.Address).Book).ToList();

            return books;
        }

        public async Task<Guid> Create(Book book)
        {
            var bookEntity = new BookEntity
            {
                Id = book.Id,
                Title = book.Title,
                Description = book.Description,
                Author = book.Author,
                Address = book.Address,
            };

            await _context.Books.AddAsync(bookEntity);
            await _context.SaveChangesAsync();

            return bookEntity.Id;
        }
        
        public async Task<Guid> Update(Guid id, string title, string description, string author, string address)
        {
            await _context.Books.Where(b => b.Id == id).ExecuteUpdateAsync(s => s
            .SetProperty(b => b.Title, b => title)
            .SetProperty(b => b.Description, b => description)
            .SetProperty(b => b.Author, b => author)
            .SetProperty(b => b.Address, b => address));

            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.Books.Where(b => b.Id == id).ExecuteDeleteAsync();

            return id;
        }

        //создадим поиск по названию книги 
        public async Task<List<Book>> Search(string title)
        {
            var bookEntities = await _context.Books.AsNoTracking().ToListAsync();
            var books = bookEntities.Select(b => Book.Create(b.Id, b.Title, b.Description, b.Author, b.Address).Book).ToList(); //получение списка книг 

            var filteredBooks = books.Where(b => b.Title.Contains(title, StringComparison.OrdinalIgnoreCase)).ToList(); // Фильтрация по названию с игнорированием регистра
            return filteredBooks;
        }
    }
}
