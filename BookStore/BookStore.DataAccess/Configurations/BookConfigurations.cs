using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookStore.Core.Models;
using BookStore.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookStore.DataAccess.Configurations
{
    public class BookConfigurations: IEntityTypeConfiguration<BookEntity>
    {
        public void Configure(EntityTypeBuilder<BookEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(b => b.Title).HasMaxLength(Book.MAX_TITLE_LENGTH).IsRequired();
            builder.Property(b => b.Description).IsRequired();
            builder.Property(b => b.Author).IsRequired();
            builder.Property(b => b.Address).IsRequired();
        }
    }
}
