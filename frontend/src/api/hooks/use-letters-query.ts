import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../../api/http-client";
import { queryKeys } from "../../api/query-keys";
import { ApiError, StandardQueryResult } from "../../api/query-types";

export type LetterSummaryDto = {
  id: string;
  subject: string | null;
  preview: string;
  visibility: "private" | "open";
  status: "queued" | "delivered" | "hidden_moderation";
};

export type LettersListDto = {
  results: LetterSummaryDto[];
  page: number;
  limit: number;
  total: number;
};

export type LettersListParams = {
  page: number;
  limit: number;
  visibility?: "private" | "open";
};

export const useLettersQuery = (params: LettersListParams): StandardQueryResult<LettersListDto> => {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit)
  });
  if (params.visibility) {
    query.set("visibility", params.visibility);
  }

  return useQuery<LettersListDto, ApiError>({
    queryKey: queryKeys.letters.list(params),
    queryFn: async () => apiRequest<LettersListDto>(`/letters?${query.toString()}`)
  });
};

