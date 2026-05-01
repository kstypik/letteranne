import { createRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { apiRequest } from "../api/http-client";
import { PublicProfileCard } from "../components/public-profile-card";
import { rootRoute } from "./root";

type DiscoveryUser = {
  id: string;
  displayId: string;
  bio: string | null;
  avatarUrl: string | null;
};

export const discoveryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discovery",
  component: DiscoveryPage
});

function DiscoveryPage() {
  const [displayId, setDisplayId] = useState("");
  const [lookupResult, setLookupResult] = useState<DiscoveryUser | null>(null);
  const [users, setUsers] = useState<DiscoveryUser[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const lookupById = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLookupResult(null);
    try {
      const user = await apiRequest<DiscoveryUser>(`/users/by-id/${displayId}`);
      setLookupResult(user);
    } catch {
      setMessage("No user found for this ID");
    }
  };

  const refreshDiscovery = async () => {
    setMessage(null);
    try {
      const response = await apiRequest<{ users: DiscoveryUser[] }>("/users/discover?limit=5");
      setUsers(response.users);
      if (response.users.length === 0) {
        setMessage("No users available right now");
      }
    } catch {
      setMessage("Unable to load discovery users");
    }
  };

  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h2>Discover people</h2>
      <form onSubmit={lookupById} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          placeholder="Enter display ID"
          value={displayId}
          onChange={(event) => setDisplayId(event.target.value)}
        />
        <button type="submit">Find user</button>
      </form>

      <button type="button" onClick={refreshDiscovery}>
        Refresh random users
      </button>

      {message ? <p role="alert">{message}</p> : null}

      {lookupResult ? (
        <PublicProfileCard
          displayId={lookupResult.displayId}
          bio={lookupResult.bio}
          avatarUrl={lookupResult.avatarUrl}
        />
      ) : null}

      <div style={{ display: "grid", gap: "0.5rem" }}>
        {users.map((user) => (
          <PublicProfileCard
            key={user.id}
            displayId={user.displayId}
            bio={user.bio}
            avatarUrl={user.avatarUrl}
          />
        ))}
      </div>
    </section>
  );
}

