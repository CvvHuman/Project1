import { Card } from "antd";
import Link from "next/link";


export default function Home() {
  return (
    <div className = "library-home-page" >  
      <h1>Добро пожаловать!</h1>
      <p>Здесь собраны все книги библиотеки №1 г. Витебска.</p>
      <div  style={{display: 'flex', justifyContent:'space-between', marginTop:"50px"}}>
        <Card title = "Начало работы" style = {{ width: 500 }}>
        <p>Для начала работы необходимо перейти на страницу <Link href="/books">книги</Link></p>
          <p>Там вы можете найти нужную книгу при помощи поиска по названию или просто ознакомиться с полным списком всех книг в библиотеке</p>
          <p>С лево с верху есть кнопка добавить - при помощи которой вы можете добавить новые книги</p>
          <p>Также каждую книгу можно редактировать и удалить пр помощи кнопок находящихся на корточке книги</p>
        </Card>
        <Card title = "Мы находимся">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae828334daa7c36228473d4dea95090f24068576709732472376cdda5007c2355&amp;source=constructor" width="500" height="200"></iframe>      
        </Card>
        <Card title = "Контакты"  style= {{width :500}}>
          <p>+375332323333</p>
          <p>6777894</p>
          <a href="vladv2369@gmail.com">library@gmail.com</a>
        </Card>
      </div>
    </div>
  );
}
