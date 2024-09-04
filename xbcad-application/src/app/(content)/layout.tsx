export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex max-h-screen min-h-screen flex-row items-center justify-center">
      <div>Side Conetent</div>
      <div className="w-full">{children}</div>
    </div>
  )
}
