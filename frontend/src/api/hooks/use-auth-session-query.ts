import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../../api/http-client";
import { queryKeys } from "../../api/query-keys";
import { ApiError, StandardQueryResult } from "../../api/query-types";

export type AuthSessionDto = {
  email: string | null;
};

export const useAuthSessionQuery = (): StandardQueryResult<AuthSessionDto> => {
  return useQuery<AuthSessionDto, ApiError>({
    queryKey: queryKeys.auth.session,
    queryFn: async () => {
      return apiRequest<AuthSessionDto>("/auth/session");
    },
    retry: false,
    throwOnError: false
  });
};

