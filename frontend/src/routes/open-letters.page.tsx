import { useEffect, useState, type FormEvent } from "react";

import { apiRequest } from "../api/http-client";

type OpenLetter = {
  id: string;
  subject: string | null;
  body: string;
};

export function OpenLettersPage() {
  const [feed, setFeed] = useState<OpenLetter[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [selectedLetterId, setSelectedLetterId] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const loadFeed = async () => {
    try {
      const result = await apiRequest<{ results: OpenLetter[] }>("/letters/open?page=1&limit=20");
      setFeed(result.results);
    } catch {
      setMessage("Unable to load open-letter feed");
    }
  };

  useEffect(() => {
    void loadFeed();
  }, []);

  const publishOpenLetter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!body.trim()) {
      setMessage("Body is required");
      return;
    }
    try {
      await apiRequest("/letters", {
        method: "POST",
        body: { visibility: "open", subject: subject || null, body }
      });
      setMessage("Open letter published");
      await loadFeed();
    } catch {
      setMessage("Unable to publish open letter");
    }
  };

  const submitReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedLetterId || !replyBody.trim()) {
      setMessage("Select a letter and enter a reply");
      return;
    }
    try {
      await apiRequest(`/letters/${selectedLetterId}/replies`, {
        method: "POST",
        body: { body: replyBody }
      });
      setMessage("Reply posted");
      setReplyBody("");
    } catch {
      setMessage("Unable to post reply");
    }
  };

  const submitReport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedLetterId || !reportReason.trim()) {
      setMessage("Select a letter and enter a reason");
      return;
    }
    try {
      await apiRequest("/moderation/reports", {
        method: "POST",
        body: { letterId: selectedLetterId, reason: reportReason }
      });
      setMessage("Report submitted");
      setReportReason("");
    } catch {
      setMessage("Unable to submit report");
    }
  };

  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h2>Open letters</h2>

      <form onSubmit={publishOpenLetter} style={{ display: "grid", gap: "0.5rem" }}>
        <h3>Publish open letter</h3>
        <input
          placeholder="Subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
        <textarea
          placeholder="Write your open letter"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <button type="submit">Publish open letter</button>
      </form>

      <div>
        <h3>Open feed</h3>
        <ul>
          {feed.map((letter) => (
            <li key={letter.id}>
              <button type="button" onClick={() => setSelectedLetterId(letter.id)}>
                {letter.subject || "(No subject)"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={submitReply} style={{ display: "grid", gap: "0.5rem" }}>
        <h3>Reply in thread</h3>
        <textarea
          placeholder="Write a reply"
          value={replyBody}
          onChange={(event) => setReplyBody(event.target.value)}
        />
        <button type="submit">Post reply</button>
      </form>

      <form onSubmit={submitReport} style={{ display: "grid", gap: "0.5rem" }}>
        <h3>Report letter</h3>
        <input
          placeholder="Reason"
          value={reportReason}
          onChange={(event) => setReportReason(event.target.value)}
        />
        <button type="submit">Submit report</button>
      </form>

      {message ? <p role="alert">{message}</p> : null}
    </section>
  );
}
