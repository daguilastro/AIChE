import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIChE - American Institute of Chemical Engineers",
  description: "Grupo estudiantil de AIChE - Promoviendo la excelencia en ingeniería química y profesiones relacionadas",
  keywords: "AIChE, ingeniería química, estudiantes, American Institute of Chemical Engineers",
  authors: [{ name: "Grupo AIChE" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
