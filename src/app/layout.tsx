import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { ToastifyContainer } from "@/components/ToastifyContainer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "The Blog - Esse é o meu Blog Next.JS",
    template: "%s | The Blog",
  },
  description: "Esse é o meu Blog Next.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>

          <ThemeSwitcher />
          <ToastifyContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
