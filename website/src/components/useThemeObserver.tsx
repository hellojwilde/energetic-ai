import { useEffect, useState } from "react";

const useThemeObserver = (): string => {
  const [currentTheme, setCurrentTheme] = useState<string>(""); // Initial state

  useEffect(() => {
    const htmlTag = document.documentElement;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = htmlTag.getAttribute("data-theme");
          setCurrentTheme(newTheme || "");
        }
      });
    });

    const observerConfig = {
      attributes: true,
      attributeFilter: ["data-theme"],
    };

    observer.observe(htmlTag, observerConfig);

    return () => {
      observer.disconnect();
    };
  }, []);

  return currentTheme;
};

export default useThemeObserver;
