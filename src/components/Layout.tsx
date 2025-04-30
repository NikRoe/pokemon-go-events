import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({
  children,
  showFooter = true,
}: {
  children: ReactNode;
  showFooter?: boolean;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
