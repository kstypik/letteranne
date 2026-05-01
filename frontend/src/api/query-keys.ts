export const queryKeys = {
  auth: {
    session: ["auth", "session"] as const
  },
  profile: {
    me: ["profile", "me"] as const
  },
  letters: {
    list: (params: { page: number; limit: number; visibility?: "private" | "open" }) =>
      ["letters", "list", params] as const,
    detail: (id: string) => ["letters", "detail", id] as const
  },
  discovery: {
    random: ["discovery", "random"] as const,
    byDisplayId: (displayId: string) => ["discovery", "by-display-id", displayId] as const
  }
};

export type AppQueryKeys = typeof queryKeys;

