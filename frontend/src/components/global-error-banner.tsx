import { useEffect, useState } from "react";

export const GlobalErrorBanner = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<string>;
      setMessage(custom.detail);
      window.setTimeout(() => setMessage(null), 4000);
    };
    window.addEventListener("app:error", handler as EventListener);
    return () => window.removeEventListener("app:error", handler as EventListener);
  }, []);

  if (!message) {
    return null;
  }
  return (
    <p role="alert" style={{ background: "#fee", color: "#900", padding: "0.5rem", borderRadius: 6 }}>
      {message}
    </p>
  );
};

