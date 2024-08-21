using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Core.Models
{
    public class Book
    {
        public const int MAX_TITLE_LENGTH = 50;
        public const int MAX_DESCRIPTION_LENGTH = 250;
        public const int MAX_AUTHOR_LENGTH = 100;
        public const int MAX_ADDRESS_LENGTH = 100;

        private Book(Guid id,string title, string description, string author,string address) 
        {
            Id = id;
            Title = title;
            Description = description;
            Author = author;
            Address = address;
        }

        public Guid Id { get;  }
        public string Title { get; } = string.Empty;
        public string Description { get;  } = string.Empty;
        public string Author { get; } = string.Empty;
        public string Address { get; } = string.Empty;

        public static (Book Book, string Error) Create(Guid id, string title, string description, string author, string address)
        {
            var error = string.Empty;

            if(string.IsNullOrEmpty(title) || title.Length > MAX_TITLE_LENGTH)
            {
                error+= "Title can not be empty or longer then 50 symbols";
            }
            if (string.IsNullOrEmpty(description) || description.Length > MAX_DESCRIPTION_LENGTH)
            {
                error += error.Length > 0 ? "\n Description can not be empty or longer then 250 symbols" : "Description can not be empty or longer then 250 symbols";
            }
            if (string.IsNullOrEmpty(author) || author.Length > MAX_AUTHOR_LENGTH)
            {
                error += error.Length > 0 ? "\n Author can not be empty or longer then 250 symbols" : "Author can not be empty or longer then 250 symbols";
            }
            if (string.IsNullOrEmpty(address) || address.Length > MAX_ADDRESS_LENGTH)
            {
                error += error.Length > 0 ? "\n Address can not be empty or longer then 250 symbols" : "Address can not be empty or longer then 250 symbols";
            }

            var book = new Book(id, title, description, author, address);

            return (book, error);
        }
    }
}
