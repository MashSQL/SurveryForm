import "./globals.css";

export const metadata = {
  title: "Survey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-800 container mx-auto text-white">
        {children}
      </body>
    </html>
  );
}
