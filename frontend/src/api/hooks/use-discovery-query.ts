import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../../api/http-client";
import { queryKeys } from "../../api/query-keys";
import { ApiError, StandardQueryResult } from "../../api/query-types";

export type DiscoveredUserDto = {
  id: string;
  displayId: string;
  bio: string | null;
  avatarUrl: string | null;
};

export type DiscoveryListDto = {
  users: DiscoveredUserDto[];
};

export const useDiscoveryQuery = (): StandardQueryResult<DiscoveryListDto> => {
  return useQuery<DiscoveryListDto, ApiError>({
    queryKey: queryKeys.discovery.random,
    queryFn: async () => apiRequest<DiscoveryListDto>("/users/discover")
  });
};

