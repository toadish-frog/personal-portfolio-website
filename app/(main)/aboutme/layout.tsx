export const metadata = {
    title: 'About',
    description: 'Something about myself.',
}

export default function AboutMeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>{children}</>
    )
}