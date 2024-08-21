using BookStore.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.DataAccess.Repos
{
    public interface IBooksRepos
    {
        Task<Guid> Create(Book book);
        Task<List<Book>> Get();
        Task<Guid> Delete(Guid id);
        Task<Guid> Update(Guid id, string title, string description, string author, string address);
        Task<List<Book>> Search(string title);
    }
}
