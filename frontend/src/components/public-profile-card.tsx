type PublicProfileCardProps = {
  displayId: string;
  bio: string | null;
  avatarUrl: string | null;
};

export const PublicProfileCard = ({ displayId, bio, avatarUrl }: PublicProfileCardProps) => {
  return (
    <article style={{ border: "1px solid #ddd", borderRadius: 8, padding: "0.75rem" }}>
      {avatarUrl ? <img src={avatarUrl} alt={`${displayId} avatar`} width={48} height={48} /> : null}
      <h3>{displayId}</h3>
      <p>{bio || "No bio yet."}</p>
    </article>
  );
};

