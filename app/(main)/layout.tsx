import Footer from "app/components/footer"
import { Navbar } from "app/components/nav"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <Navbar />
            {children}
            <Footer />
        </section>
    )
}
