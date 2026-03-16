export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="min-h-screen bg-black px-6 py-10">{children}</section>;
}
