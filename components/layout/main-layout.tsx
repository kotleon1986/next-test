import { FC, ReactNode } from "react";
import Footer from "./footer"
import Header from "./header"

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <>
        <Header />
          <main>{ children }</main>
        <Footer />
      </>
    )
}

export default MainLayout;