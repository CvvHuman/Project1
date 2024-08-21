import { Layout, Menu } from "antd";
import "./globals.css";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";
import { useRouter } from "next/router";

const items = [
  { key: "home", label: <Link href={"/"}>Home</Link> },
  { key: "books", label: <Link href={"/books"}>Books</Link> }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: "100vh" }}>
          <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontWeight: "bold", color: "white", fontSize: "24px"}}>Справочник библиотеки №1</div>
              <div style={{ flex: 1, paddingLeft: "50px" }}>
                <Menu theme="dark" mode="horizontal" items={items} style={{ flex: 1, minWidth: 0}} />
              </div>
            </div>
          </Header>
          <Content style={{ padding: "0 48px"}}>{children}</Content>
          <Footer style={{ textAlign: "center", borderTop: "1px solid #e9e9e9" }}>
            Powered by{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://vgke.by/">vgke</a>
            <div>
              <h3>Политика конфиденциальности:</h3>
                <p>
                  Настоящее Положение о конфиденциальности (далее – «Положение») регламентируется Законом Республики Беларусь 
                  «Об информации, информатизации и защите информации», иным законодательством Республики Беларусь
                </p>
            </div>
            Book lib 2024</Footer>
        </Layout>
      </body>
    </html>
  );
}
