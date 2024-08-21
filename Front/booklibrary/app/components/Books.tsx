import { CardTitle } from "./CardTitle";
import Card from "antd/es/card/Card";
import Button from "antd/es/button/button";

interface Props{
    books: Book[];
    handleDelete: (id: string) => void;
    handleOpen: (book: Book) => void;
}



export const Books = ({books, handleDelete, handleOpen}: Props) =>{
    return(
        <div className="cards">
            {
            books.map((book: Book) => (
                <Card key={book.id} title = {<CardTitle title= {book.title} author= {book.author}/>} bordered = {false}>
                    <p><b>описание:</b> {book.description}</p>
                    <p><b>жанр:</b> {book.address}</p>
                    <div className="card_buttons">
                        <Button onClick={() => handleOpen(book)} style={{flex: 1}}>Изменить</Button>
                        <Button onClick={() => handleDelete(book.id)} style={{flex: 1}}>Удалить</Button>
                    </div>
                </Card>
            ))
            }
        </div>
    );
}