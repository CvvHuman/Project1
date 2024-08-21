interface Props{
    title: string;
    author: string;
}

export const CardTitle = ({title, author}: Props) => {
    return (
        <div style = {{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <p className="card_title">название: {title}</p>
            <p className="card_author">автор: {author}</p>
        </div>
    )
}