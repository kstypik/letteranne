import { createRoute, Link } from "@tanstack/react-router";

import { useLettersQuery } from "../api/hooks/use-letters-query";
import { rootRoute } from "./root";

export const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: HistoryPage
});

function HistoryPage() {
  const query = useLettersQuery({ page: 1, limit: 20, visibility: "private" });

  if (query.isLoading) {
    return <p>Loading letter history...</p>;
  }

  if (query.isError) {
    return <p role="alert">Unable to load history</p>;
  }

  if (!query.data || query.data.results.length === 0) {
    return <p>No letters yet.</p>;
  }

  return (
    <section>
      <h2>Letter history</h2>
      <ul>
        {query.data.results.map((letter) => (
          <li key={letter.id}>
            <Link to="/letters/$letterId" params={{ letterId: letter.id }}>
              {letter.subject || "(No subject)"}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

