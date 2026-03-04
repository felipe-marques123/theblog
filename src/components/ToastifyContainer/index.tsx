"use client";

import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";

export function ToastifyContainer() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Função para verificar se o html tem a classe .dark
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    // Verifica o tema inicial
    checkTheme();

    // Cria um observer para monitorar mudanças de classe no html
    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme={theme}
      transition={Bounce}
    />
  );
}
