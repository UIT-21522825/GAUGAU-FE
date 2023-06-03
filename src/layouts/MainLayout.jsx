import React from "react";
import Header from "../components/TunTun/Header";
import Footer from "../components/TunTun/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
