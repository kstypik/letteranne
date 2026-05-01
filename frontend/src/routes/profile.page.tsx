import { useEffect, useState, type FormEvent } from "react";

import { apiRequest } from "../api/http-client";
import { PublicProfileCard } from "../components/public-profile-card";

type ProfilePayload = {
  email: string;
  bio: string | null;
  avatarUrl: string | null;
};

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfilePayload | null>(null);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    apiRequest<ProfilePayload>("/profiles/me")
      .then((result) => {
        setProfile(result);
        setBio(result.bio ?? "");
        setAvatarUrl(result.avatarUrl ?? "");
      })
      .catch(() => {
        setFeedback("Unable to load profile");
      });
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (avatarUrl && !avatarUrl.startsWith("http")) {
      setFeedback("Avatar URL must be valid");
      return;
    }

    try {
      const result = await apiRequest<ProfilePayload>("/profiles/me", {
        method: "PATCH",
        body: { bio, avatarUrl }
      });
      setProfile(result);
      setFeedback("Profile saved");
    } catch {
      setFeedback("Unable to save profile");
    }
  };

  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h2>Edit profile</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <label>
          Bio
          <textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} />
        </label>
        <label>
          Avatar URL
          <input value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} />
        </label>
        <button type="submit">Save profile</button>
      </form>
      {feedback ? <p role="alert">{feedback}</p> : null}
      <PublicProfileCard
        displayId={profile?.email ?? "unknown"}
        bio={profile?.bio ?? (bio || null)}
        avatarUrl={profile?.avatarUrl ?? (avatarUrl || null)}
      />
    </section>
  );
}
