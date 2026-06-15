import Footer from "@/components/custom/footer"
import Navbar from "@/components/custom/navbar"
import type { PropsWithChildren } from "react"

export default function Layout(props: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  )
}
