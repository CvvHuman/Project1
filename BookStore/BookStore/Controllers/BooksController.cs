using BookStore.Application.Services;
using BookStore.Contracts;
using BookStore.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace BookStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBooksService _booksService;

        public BooksController(IBooksService booksService)
        {
            _booksService = booksService;
        }

        [HttpGet]
        public async Task<ActionResult<List<BooksResponse>>> GetBooks()
        {
            var books = await _booksService.GetAllBooks();
            var response = books.Select(b => new BooksResponse(b.Id, b.Title, b.Description, b.Author,b.Address));
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateBook([FromBody] BooksRequest booksRequest)
        {
            var (book, error) = Book.Create(Guid.NewGuid(), booksRequest.Title, booksRequest.Description, booksRequest.Author, booksRequest.Address);
            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(error);
            }

            var bookId = await _booksService.CreateBook(book);

            return Ok(bookId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateBooks(Guid id, [FromBody] BooksRequest booksRequest)
        {
            var bookId = await _booksService.UpdateBook(id, booksRequest.Title, booksRequest.Description, booksRequest.Author, booksRequest.Address);

            return Ok(bookId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteBook(Guid id)
        {
            return Ok(await _booksService.DeleteBook(id));
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<BooksResponse>>> SearchBooks([FromQuery] string title)
        {
            var books = await _booksService.SearchBooksByTitle(title);
            var response = books.Select(b => new BooksResponse(b.Id, b.Title, b.Description, b.Author, b.Address)).ToList();
            return Ok(response);
        }
    }
}
