"use client";
import { useEffect, useState } from "react";
import { BookRequest, createBook, deleteBook, getAllBooks, updateBook, searchBooksByTitle } from "../services/books";
import { Books } from "../components/Books";
import Title from "antd/es/typography/Title";
import { CreateUpdateBook, Mode } from "../components/CreateUpdateBook";
import Button from "antd/es/button/button";
import { Input } from 'antd';
import { BooksModel } from "../Models/Books";

export default function BooksPage() {
  const defaultValues = {
    title: "",
    description: "",
    author: "",
    address: "",
  } as Book;
  const [values, setValues] = useState<Book>(defaultValues);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(Mode.Create);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      const books = await getAllBooks();
      setLoading(false);
      setBooks(books);
    };
    getBooks();
  }, []);

  useEffect(() => {
    const inputElement = document.getElementById("searchInput") as HTMLInputElement;
    const handleInputChange = () => {
      var title = inputElement.value.trim();
      if (title === "") {
        const getBooks = async () => {
          setLoading(true);
          const books = await getAllBooks();
          setLoading(false);
          setBooks(books);
        };
        getBooks();       
        title ="";
        setSearchTitle("")
      } else {
        searchBooksByTitle(title); 
      }
    };
    inputElement.addEventListener("input", handleInputChange);
    return () => {
      inputElement.removeEventListener("input", handleInputChange);
    };
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const books = await searchBooksByTitle(searchTitle);
      setBooks(books);
    } catch (error) {
      console.error(error);
      // Обработка ошибки, например, вывод сообщения об ошибке
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = async (request: BookRequest) => {
    try {
      await createBook(request);
      closeModal();
      const books = await getAllBooks();
      setBooks(books);
    } catch (error) {
      console.error(error);
      // Обработка ошибки, например, вывод сообщения об ошибке
    }
  };

  const handleUpdateBook = async (id: string, request: BookRequest) => {
    try {
      await updateBook(id, request);
      closeModal();
      const books = await getAllBooks();
      setBooks(books);
    } catch (error) {
      console.error(error);
      // Обработка ошибки, например, вывод сообщения об ошибке
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBook(id);
      closeModal();
      const books = await getAllBooks();
      setBooks(books);
    } catch (error) {
      console.error(error);
      // Обработка ошибки, например, вывод сообщения об ошибке
    }
  };

  const openModal = () => {
    setMode(Mode.Create);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setValues(defaultValues);
  };

  const openEditModal = (book: Book) => {
    setMode(Mode.Edit);
    setValues(book);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: "flex"}}>
        <Button onClick={openModal}>Добавить книгу</Button>
        <Input id="searchInput" type="text" placeholder="Поиск по названию книги" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
        <Button onClick={handleSearch}>Поиск</Button>
      </div>

      <CreateUpdateBook
        mode={mode}
        values={values}
        isModalOpen={isModalOpen}
        handleCreate={handleCreateBook}
        handleUpdate={handleUpdateBook}
        handleCancel={closeModal}
      />
      {loading ? <Title>Загрузка...</Title> : <Books books={books} handleOpen={openEditModal} handleDelete={handleDeleteBook} />}
    </div>
  );
}