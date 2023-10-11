import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useState } from "react";
import Mycontext from "../pages/context";
export default function Layout({ children }) {
  const [color, setColor] = useState("bg-yellow-500");
  return (
    <>
      <Mycontext.Provider value={{ color, setColor }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </Mycontext.Provider>
    </>
  );
}
