import { title } from 'process';

export interface BookRequest{
    title: string;
    description: string;
    author: string;
    address: string;
}

export const getAllBooks = async () => {
    const response = await fetch("http://localhost:5019/Books");
    
    return response.json();
}

export const searchBooksByTitle = async (title: string) => {
    try {
      const url = `http://localhost:5019/Books/search?title=${encodeURIComponent(title)}`;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to search books by title');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const createBook = async (bookRequest: BookRequest) => {
    await fetch("http://localhost:5019/Books", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(bookRequest),
    });
}

export const updateBook = async (id: string, bookRequest: BookRequest) => {
    await fetch(`http://localhost:5019/Books/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(bookRequest),
    });
}

export const deleteBook = async (id: string) => {
    await fetch(`http://localhost:5019/Books/${id}`, {
        method: "DELETE",
    });
}

