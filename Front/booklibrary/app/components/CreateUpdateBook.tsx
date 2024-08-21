import { Input, Modal } from "antd";
import { BookRequest } from "../services/books";
import { title } from "process";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

interface Props{
    mode: Mode;
    values: Book;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, request: BookRequest) => void;
}

export enum Mode{
    Create,
    Edit,
}

export const CreateUpdateBook = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate} : Props) => {
        const [title, setTitle] = useState<string>("");
        const [description, setDescription] = useState<string>("");
        const [author, setAuthor] = useState<string>("");
        const [address, setAddress] = useState<string>("");

        useEffect(() => {
            setTitle(values.title);
            setDescription(values.description);
            setAuthor(values.author);
            setAddress(values.address);

        }, [values]);

        const handleOnOk = async () => {
            const bookRequest = {title, description, author, address};

            mode == Mode.Create ? handleCreate(bookRequest) : handleUpdate(values.id, bookRequest);
        }

        return(
            <Modal title = {mode === Mode.Create ? "Добавить книгу" : "Редактировать книгу"}
            open = {isModalOpen}
            cancelText = {"Отмена"}
            onOk = {handleOnOk}
            onCancel={handleCancel}>
                <div className="book_modal">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название"
                    />
                    <TextArea value = {description} onChange={(e) => setDescription(e.target.value)}
                    autoSize = {{minRows: 3, maxRows: 3}}
                    placeholder="Описание"/>
                    <TextArea value = {author} onChange={(e) => setAuthor(e.target.value)}
                    autoSize = {{minRows: 2, maxRows: 2}}
                    placeholder="Автор"/>
                    <TextArea value = {address} onChange={(e) => setAddress(e.target.value)}
                    autoSize = {{minRows: 2, maxRows: 2}}
                    placeholder="Жанр"/>
                </div>
            </Modal>
        )
};