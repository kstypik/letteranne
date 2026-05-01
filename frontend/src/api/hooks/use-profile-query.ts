import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../../api/http-client";
import { queryKeys } from "../../api/query-keys";
import { ApiError, StandardQueryResult } from "../../api/query-types";

export type ProfileDto = {
  bio: string | null;
  avatarUrl: string | null;
};

export const useProfileQuery = (): StandardQueryResult<ProfileDto> => {
  return useQuery<ProfileDto, ApiError>({
    queryKey: queryKeys.profile.me,
    queryFn: async () => apiRequest<ProfileDto>("/profiles/me"),
    retry: false
  });
};

