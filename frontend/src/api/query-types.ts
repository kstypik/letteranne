import { QueryObserverResult, UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export type ApiError = {
  message: string;
  status?: number;
};

export type StandardQueryResult<TData> = UseQueryResult<TData, ApiError>;
export type StandardMutationResult<TData, TVariables> = UseMutationResult<
  TData,
  ApiError,
  TVariables,
  unknown
>;

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Unexpected API error" };
};

export const isSuccess = <TData>(result: QueryObserverResult<TData, ApiError>): boolean =>
  result.status === "success";

