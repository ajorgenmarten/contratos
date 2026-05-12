import type { PropsWithChildren } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout(props: PropsWithChildren) {
  return <main className="min-h-screen bg-background">
    <Navbar />
    {props.children}
    <Footer />
  </main>
}
