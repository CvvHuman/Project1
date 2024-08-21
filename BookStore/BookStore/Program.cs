using BookStore.Application.Services;
using BookStore.DataAccess;
using Microsoft.EntityFrameworkCore;
using BookStore.Application;
using BookStore.DataAccess.Repos;

var builder = WebApplication.CreateBuilder(args);

// Добавление сервисов в контейнер.

builder.Services.AddControllers();
// Узнайте больше о настройке Swagger/OpenAPI по адресу https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookstoreDbContext>(
    options =>
    {
        options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(BookstoreDbContext)));
    });

builder.Services.AddScoped<IBooksService, BooksService>();
builder.Services.AddScoped<IBooksRepos, BooksRepos>();


var app = builder.Build();

// Настройка конвейера обработки HTTP-запросов.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(x =>
{
    x.WithHeaders().AllowAnyHeader();
    x.WithOrigins("http://localhost:3000");
    x.WithMethods("GET", "POST", "PUT", "DELETE");
});

app.MapControllers();

app.Run();