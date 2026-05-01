import { getRouteApi } from "@tanstack/react-router";

import { useLetterDetailQuery } from "../api/hooks";

const letterDetailRouteApi = getRouteApi("/letters/$letterId");

export function LetterDetailPage() {
  const { letterId } = letterDetailRouteApi.useParams();
  const query = useLetterDetailQuery(letterId);

  if (query.isLoading) {
    return <p>Loading letter...</p>;
  }

  if (query.isError) {
    return <p role="alert">Unable to load letter details</p>;
  }

  if (!query.data) {
    return <p>No letter found.</p>;
  }

  return (
    <article>
      <h2>{query.data.subject || "(No subject)"}</h2>
      <p>{query.data.body}</p>
      <small>
        Status: {query.data.status} | Scheduled: {query.data.scheduledFor}
      </small>
      {query.data.postcard ? (
        <figure>
          <img src={query.data.postcard.imageUrl} alt={query.data.postcard.title} width={160} />
          <figcaption>{query.data.postcard.title}</figcaption>
        </figure>
      ) : null}
    </article>
  );
}
