import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../../api/http-client";
import { queryKeys } from "../../api/query-keys";
import type { ApiError, StandardQueryResult } from "../../api/query-types";

export type LetterDetailDto = {
  id: string;
  senderId: string;
  recipientId: string | null;
  visibility: "private" | "open";
  status: "queued" | "delivered" | "hidden_moderation";
  subject: string | null;
  body: string;
  scheduledFor: string;
  deliveredAt: string | null;
  postcard?: {
    title: string;
    imageUrl: string;
  } | null;
};

export const useLetterDetailQuery = (id: string): StandardQueryResult<LetterDetailDto> => {
  return useQuery<LetterDetailDto, ApiError>({
    queryKey: queryKeys.letters.detail(id),
    queryFn: async () => apiRequest<LetterDetailDto>(`/letters/${id}`),
    enabled: Boolean(id)
  });
};

