namespace BookStore.Contracts
{
    public record BooksResponse(Guid Id,string Title, string Description, string Author, string Address);  

    public record BooksRequest(string Title,string Description, string Author, string Address);
}
