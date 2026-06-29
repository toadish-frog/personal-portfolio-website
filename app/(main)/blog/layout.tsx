export const metadata = {
    title: 'Blog',
    description: 'Read my blog.',
}

export default function PostLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>{children}</>
    )
}