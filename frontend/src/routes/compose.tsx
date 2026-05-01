import { createRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { apiRequest } from "../api/http-client";
import { rootRoute } from "./root";

type CreateLetterPayload = {
  recipientId: string;
  visibility: "private";
  subject: string | null;
  body: string;
  scheduledFor: string | null;
};

export const composeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compose",
  component: ComposePage
});

function ComposePage() {
  const navigate = useNavigate();
  const [recipientId, setRecipientId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [ownedPostcards, setOwnedPostcards] = useState<Array<{ id: string; title: string }>>([]);
  const [selectedUserPostcardId, setSelectedUserPostcardId] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPostcards = async () => {
    try {
      const result = await apiRequest<{ items: Array<{ id: string; title: string }> }>(
        "/postcards/collection"
      );
      setOwnedPostcards(result.items);
      setShowPicker(true);
    } catch {
      setError("Unable to load postcards");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!body.trim()) {
      setError("Body is required");
      return;
    }

    const payload: CreateLetterPayload = {
      recipientId,
      visibility: "private",
      subject: subject.trim() ? subject.trim() : null,
      body: body.trim(),
      scheduledFor: scheduledFor || null
    };

    try {
      const created = await apiRequest<{ id: string }>("/letters", { method: "POST", body: payload });
      if (selectedUserPostcardId) {
        await apiRequest(`/letters/${created.id}/postcard`, {
          method: "POST",
          body: { userPostcardId: selectedUserPostcardId }
        });
      }
      navigate({ to: "/app" });
    } catch {
      setError("Unable to send letter");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <h2>Compose letter</h2>
      <label>
        Recipient ID
        <input value={recipientId} onChange={(event) => setRecipientId(event.target.value)} />
      </label>
      <label>
        Subject
        <input value={subject} onChange={(event) => setSubject(event.target.value)} />
      </label>
      <label>
        Body
        <textarea value={body} onChange={(event) => setBody(event.target.value)} rows={8} />
      </label>
      <label>
        Schedule for
        <input
          type="datetime-local"
          value={scheduledFor}
          onChange={(event) => setScheduledFor(event.target.value)}
        />
      </label>
      <button type="button" onClick={loadPostcards}>
        Pick postcard
      </button>
      {showPicker ? (
        <label>
          Owned postcards
          <select
            value={selectedUserPostcardId}
            onChange={(event) => setSelectedUserPostcardId(event.target.value)}
          >
            <option value="">None</option>
            {ownedPostcards.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {error ? <p role="alert">{error}</p> : null}
      <button type="submit">Send letter</button>
    </form>
  );
}

