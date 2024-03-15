import { api } from "./api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    accountsLoginCreate: build.mutation<
      AccountsLoginCreateApiResponse,
      AccountsLoginCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/login/`,
        method: "POST",
        body: queryArg.login,
      }),
    }),
    accountsLogoutCreate: build.mutation<
      AccountsLogoutCreateApiResponse,
      AccountsLogoutCreateApiArg
    >({
      query: () => ({ url: `/api/accounts/logout/`, method: "POST" }),
    }),
    accountsPasswordChangeCreate: build.mutation<
      AccountsPasswordChangeCreateApiResponse,
      AccountsPasswordChangeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/password/change/`,
        method: "POST",
        body: queryArg.passwordChange,
      }),
    }),
    accountsPasswordResetCreate: build.mutation<
      AccountsPasswordResetCreateApiResponse,
      AccountsPasswordResetCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/password/reset/`,
        method: "POST",
        body: queryArg.passwordReset,
      }),
    }),
    accountsPasswordResetConfirmCreate: build.mutation<
      AccountsPasswordResetConfirmCreateApiResponse,
      AccountsPasswordResetConfirmCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/password/reset/confirm/`,
        method: "POST",
        body: queryArg.passwordResetConfirm,
      }),
    }),
    accountsSignupCreate: build.mutation<
      AccountsSignupCreateApiResponse,
      AccountsSignupCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/signup/`,
        method: "POST",
        body: queryArg.register,
      }),
    }),
    accountsSignupResendEmailCreate: build.mutation<
      AccountsSignupResendEmailCreateApiResponse,
      AccountsSignupResendEmailCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/signup/resend-email/`,
        method: "POST",
        body: queryArg.resendEmailVerification,
      }),
    }),
    accountsSignupVerifyEmailCreate: build.mutation<
      AccountsSignupVerifyEmailCreateApiResponse,
      AccountsSignupVerifyEmailCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/signup/verify-email/`,
        method: "POST",
        body: queryArg.verifyEmail,
      }),
    }),
    accountsTokenRefreshCreate: build.mutation<
      AccountsTokenRefreshCreateApiResponse,
      AccountsTokenRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/token/refresh/`,
        method: "POST",
        body: queryArg.tokenRefresh,
      }),
    }),
    accountsTokenVerifyCreate: build.mutation<
      AccountsTokenVerifyCreateApiResponse,
      AccountsTokenVerifyCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/token/verify/`,
        method: "POST",
        body: queryArg.tokenVerify,
      }),
    }),
    accountsUserRetrieve: build.query<
      AccountsUserRetrieveApiResponse,
      AccountsUserRetrieveApiArg
    >({
      query: () => ({ url: `/api/accounts/user/` }),
    }),
    accountsUserUpdate: build.mutation<
      AccountsUserUpdateApiResponse,
      AccountsUserUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/user/`,
        method: "PUT",
        body: queryArg.userDetails,
      }),
    }),
    accountsUserPartialUpdate: build.mutation<
      AccountsUserPartialUpdateApiResponse,
      AccountsUserPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/accounts/user/`,
        method: "PATCH",
        body: queryArg.patchedUserDetails,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as letteranneApi };
export type AccountsLoginCreateApiResponse = /** status 200  */ JwtRead;
export type AccountsLoginCreateApiArg = {
  login: Login;
};
export type AccountsLogoutCreateApiResponse =
  /** status 200  */ RestAuthDetailRead;
export type AccountsLogoutCreateApiArg = void;
export type AccountsPasswordChangeCreateApiResponse =
  /** status 200  */ RestAuthDetailRead;
export type AccountsPasswordChangeCreateApiArg = {
  passwordChange: PasswordChange;
};
export type AccountsPasswordResetCreateApiResponse =
  /** status 200  */ RestAuthDetailRead;
export type AccountsPasswordResetCreateApiArg = {
  passwordReset: PasswordReset;
};
export type AccountsPasswordResetConfirmCreateApiResponse =
  /** status 200  */ RestAuthDetailRead;
export type AccountsPasswordResetConfirmCreateApiArg = {
  passwordResetConfirm: PasswordResetConfirm;
};
export type AccountsSignupCreateApiResponse = /** status 201  */ JwtRead;
export type AccountsSignupCreateApiArg = {
  register: RegisterWrite;
};
export type AccountsSignupResendEmailCreateApiResponse =
  /** status 201  */ RestAuthDetailRead;
export type AccountsSignupResendEmailCreateApiArg = {
  resendEmailVerification: ResendEmailVerification;
};
export type AccountsSignupVerifyEmailCreateApiResponse =
  /** status 200  */ RestAuthDetailRead;
export type AccountsSignupVerifyEmailCreateApiArg = {
  verifyEmail: VerifyEmailWrite;
};
export type AccountsTokenRefreshCreateApiResponse =
  /** status 200  */ TokenRefreshRead;
export type AccountsTokenRefreshCreateApiArg = {
  tokenRefresh: TokenRefreshWrite;
};
export type AccountsTokenVerifyCreateApiResponse =
  /** status 200  */ TokenVerify;
export type AccountsTokenVerifyCreateApiArg = {
  tokenVerify: TokenVerifyWrite;
};
export type AccountsUserRetrieveApiResponse =
  /** status 200  */ UserDetailsRead;
export type AccountsUserRetrieveApiArg = void;
export type AccountsUserUpdateApiResponse = /** status 200  */ UserDetailsRead;
export type AccountsUserUpdateApiArg = {
  userDetails: UserDetails;
};
export type AccountsUserPartialUpdateApiResponse =
  /** status 200  */ UserDetailsRead;
export type AccountsUserPartialUpdateApiArg = {
  patchedUserDetails: PatchedUserDetails;
};
export type UserDetails = {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
};
export type UserDetailsRead = {
  pk: number;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  email: string;
};
export type Jwt = {
  access: string;
  refresh: string;
  user: UserDetails;
};
export type JwtRead = {
  access: string;
  refresh: string;
  user: UserDetailsRead;
};
export type ValidationErrorEnum = "validation_error";
export type AccountsLoginCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsLoginCreateUsernameErrorComponent = {
  /** * `username` - username */
  attr: "username";
  /** * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsLoginCreateEmailErrorComponent = {
  /** * `email` - email */
  attr: "email";
  /** * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsLoginCreatePasswordErrorComponent = {
  /** * `password` - password */
  attr: "password";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsLoginCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsLoginCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "username";
    } & AccountsLoginCreateUsernameErrorComponent)
  | ({
      attr: "email";
    } & AccountsLoginCreateEmailErrorComponent)
  | ({
      attr: "password";
    } & AccountsLoginCreatePasswordErrorComponent);
export type AccountsLoginCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsLoginCreateError[];
};
export type ClientErrorEnum = "client_error";
export type ParseErrorCodeEnum = "parse_error";
export type ParseError = {
  code: ParseErrorCodeEnum;
  detail: string;
  attr: string | null;
};
export type ParseErrorResponse = {
  type: ClientErrorEnum;
  errors: ParseError[];
};
export type AccountsLoginCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsLoginCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type ErrorCode401Enum = "authentication_failed" | "not_authenticated";
export type Error401 = {
  code: ErrorCode401Enum;
  detail: string;
  attr: string | null;
};
export type ErrorResponse401 = {
  type: ClientErrorEnum;
  errors: Error401[];
};
export type ErrorCode405Enum = "method_not_allowed";
export type Error405 = {
  code: ErrorCode405Enum;
  detail: string;
  attr: string | null;
};
export type ErrorResponse405 = {
  type: ClientErrorEnum;
  errors: Error405[];
};
export type ErrorCode406Enum = "not_acceptable";
export type Error406 = {
  code: ErrorCode406Enum;
  detail: string;
  attr: string | null;
};
export type ErrorResponse406 = {
  type: ClientErrorEnum;
  errors: Error406[];
};
export type ErrorCode415Enum = "unsupported_media_type";
export type Error415 = {
  code: ErrorCode415Enum;
  detail: string;
  attr: string | null;
};
export type ErrorResponse415 = {
  type: ClientErrorEnum;
  errors: Error415[];
};
export type ServerErrorEnum = "server_error";
export type ErrorCode500Enum = "error";
export type Error500 = {
  code: ErrorCode500Enum;
  detail: string;
  attr: string | null;
};
export type ErrorResponse500 = {
  type: ServerErrorEnum;
  errors: Error500[];
};
export type Login = {
  username?: string;
  email?: string;
  password: string;
};
export type RestAuthDetail = {};
export type RestAuthDetailRead = {
  detail: string;
};
export type AccountsLogoutCreateErrorResponse400 = {
  type: "client_error";
} & ParseErrorResponse;
export type AccountsPasswordChangeCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsPasswordChangeCreateNewPassword1ErrorComponent = {
  /** * `new_password1` - new_password1 */
  attr: "new_password1";
  /** * `blank` - blank
   * `invalid` - invalid
   * `max_length` - max_length
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "max_length"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsPasswordChangeCreateNewPassword2ErrorComponent = {
  /** * `new_password2` - new_password2 */
  attr: "new_password2";
  /** * `blank` - blank
   * `invalid` - invalid
   * `max_length` - max_length
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "max_length"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsPasswordChangeCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsPasswordChangeCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "new_password1";
    } & AccountsPasswordChangeCreateNewPassword1ErrorComponent)
  | ({
      attr: "new_password2";
    } & AccountsPasswordChangeCreateNewPassword2ErrorComponent);
export type AccountsPasswordChangeCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsPasswordChangeCreateError[];
};
export type AccountsPasswordChangeCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsPasswordChangeCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type PasswordChange = {
  new_password1: string;
  new_password2: string;
};
export type AccountsPasswordResetCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsPasswordResetCreateEmailErrorComponent = {
  /** * `email` - email */
  attr: "email";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsPasswordResetCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsPasswordResetCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "email";
    } & AccountsPasswordResetCreateEmailErrorComponent);
export type AccountsPasswordResetCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsPasswordResetCreateError[];
};
export type AccountsPasswordResetCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsPasswordResetCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type PasswordReset = {
  email: string;
};
export type AccountsPasswordResetConfirmCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsPasswordResetConfirmCreateNewPassword1ErrorComponent = {
  /** * `new_password1` - new_password1 */
  attr: "new_password1";
  /** * `blank` - blank
   * `invalid` - invalid
   * `max_length` - max_length
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "max_length"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsPasswordResetConfirmCreateNewPassword2ErrorComponent = {
  /** * `new_password2` - new_password2 */
  attr: "new_password2";
  /** * `blank` - blank
   * `invalid` - invalid
   * `max_length` - max_length
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "max_length"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsPasswordResetConfirmCreateUidErrorComponent = {
  /** * `uid` - uid */
  attr: "uid";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsPasswordResetConfirmCreateTokenErrorComponent = {
  /** * `token` - token */
  attr: "token";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsPasswordResetConfirmCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsPasswordResetConfirmCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "new_password1";
    } & AccountsPasswordResetConfirmCreateNewPassword1ErrorComponent)
  | ({
      attr: "new_password2";
    } & AccountsPasswordResetConfirmCreateNewPassword2ErrorComponent)
  | ({
      attr: "uid";
    } & AccountsPasswordResetConfirmCreateUidErrorComponent)
  | ({
      attr: "token";
    } & AccountsPasswordResetConfirmCreateTokenErrorComponent);
export type AccountsPasswordResetConfirmCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsPasswordResetConfirmCreateError[];
};
export type AccountsPasswordResetConfirmCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsPasswordResetConfirmCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type PasswordResetConfirm = {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
};
export type AccountsSignupCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsSignupCreateUsernameErrorComponent = {
  /** * `username` - username */
  attr: "username";
  /** * `blank` - blank
   * `invalid` - invalid
   * `max_length` - max_length
   * `min_length` - min_length
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "max_length"
    | "min_length"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsSignupCreateEmailErrorComponent = {
  /** * `email` - email */
  attr: "email";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsSignupCreatePassword1ErrorComponent = {
  /** * `password1` - password1 */
  attr: "password1";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsSignupCreatePassword2ErrorComponent = {
  /** * `password2` - password2 */
  attr: "password2";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsSignupCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsSignupCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "username";
    } & AccountsSignupCreateUsernameErrorComponent)
  | ({
      attr: "email";
    } & AccountsSignupCreateEmailErrorComponent)
  | ({
      attr: "password1";
    } & AccountsSignupCreatePassword1ErrorComponent)
  | ({
      attr: "password2";
    } & AccountsSignupCreatePassword2ErrorComponent);
export type AccountsSignupCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsSignupCreateError[];
};
export type AccountsSignupCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsSignupCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type Register = {
  username: string;
  email?: string;
};
export type RegisterWrite = {
  username: string;
  email?: string;
  password1: string;
  password2: string;
};
export type AccountsSignupResendEmailCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsSignupResendEmailCreateEmailErrorComponent = {
  /** * `email` - email */
  attr: "email";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsSignupResendEmailCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsSignupResendEmailCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "email";
    } & AccountsSignupResendEmailCreateEmailErrorComponent);
export type AccountsSignupResendEmailCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsSignupResendEmailCreateError[];
};
export type AccountsSignupResendEmailCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsSignupResendEmailCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type ResendEmailVerification = {
  email?: string;
};
export type AccountsSignupVerifyEmailCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsSignupVerifyEmailCreateKeyErrorComponent = {
  /** * `key` - key */
  attr: "key";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsSignupVerifyEmailCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsSignupVerifyEmailCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "key";
    } & AccountsSignupVerifyEmailCreateKeyErrorComponent);
export type AccountsSignupVerifyEmailCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsSignupVerifyEmailCreateError[];
};
export type AccountsSignupVerifyEmailCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsSignupVerifyEmailCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type VerifyEmail = {};
export type VerifyEmailWrite = {
  key: string;
};
export type TokenRefresh = {};
export type TokenRefreshRead = {
  access: string;
};
export type TokenRefreshWrite = {
  refresh: string;
};
export type AccountsTokenRefreshCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsTokenRefreshCreateRefreshErrorComponent = {
  /** * `refresh` - refresh */
  attr: "refresh";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsTokenRefreshCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsTokenRefreshCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "refresh";
    } & AccountsTokenRefreshCreateRefreshErrorComponent);
export type AccountsTokenRefreshCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsTokenRefreshCreateError[];
};
export type AccountsTokenRefreshCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsTokenRefreshCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type TokenVerify = {};
export type TokenVerifyWrite = {
  token: string;
};
export type AccountsTokenVerifyCreateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsTokenVerifyCreateTokenErrorComponent = {
  /** * `token` - token */
  attr: "token";
  /** * `blank` - blank
   * `invalid` - invalid
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed */
  code:
    | "blank"
    | "invalid"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed";
  detail: string;
};
export type AccountsTokenVerifyCreateError =
  | ({
      attr: "non_field_errors";
    } & AccountsTokenVerifyCreateNonFieldErrorsErrorComponent)
  | ({
      attr: "token";
    } & AccountsTokenVerifyCreateTokenErrorComponent);
export type AccountsTokenVerifyCreateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsTokenVerifyCreateError[];
};
export type AccountsTokenVerifyCreateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsTokenVerifyCreateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type AccountsUserRetrieveErrorResponse400 = {
  type: "client_error";
} & ParseErrorResponse;
export type AccountsUserUpdateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsUserUpdateUsernameErrorComponent = {
  /** * `username` - username */
  attr: "username";
  /** * `blank` - blank
   * `invalid` - invalid
   * `max_length` - max_length
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed
   * `unique` - unique */
  code:
    | "blank"
    | "invalid"
    | "max_length"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed"
    | "unique";
  detail: string;
};
export type AccountsUserUpdateError =
  | ({
      attr: "non_field_errors";
    } & AccountsUserUpdateNonFieldErrorsErrorComponent)
  | ({
      attr: "username";
    } & AccountsUserUpdateUsernameErrorComponent);
export type AccountsUserUpdateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsUserUpdateError[];
};
export type AccountsUserUpdateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsUserUpdateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type AccountsUserPartialUpdateNonFieldErrorsErrorComponent = {
  /** * `non_field_errors` - non_field_errors */
  attr: "non_field_errors";
  /** * `invalid` - invalid */
  code: "invalid";
  detail: string;
};
export type AccountsUserPartialUpdateUsernameErrorComponent = {
  /** * `username` - username */
  attr: "username";
  /** * `blank` - blank
   * `invalid` - invalid
   * `max_length` - max_length
   * `null` - null
   * `null_characters_not_allowed` - null_characters_not_allowed
   * `required` - required
   * `surrogate_characters_not_allowed` - surrogate_characters_not_allowed
   * `unique` - unique */
  code:
    | "blank"
    | "invalid"
    | "max_length"
    | "null"
    | "null_characters_not_allowed"
    | "required"
    | "surrogate_characters_not_allowed"
    | "unique";
  detail: string;
};
export type AccountsUserPartialUpdateError =
  | ({
      attr: "non_field_errors";
    } & AccountsUserPartialUpdateNonFieldErrorsErrorComponent)
  | ({
      attr: "username";
    } & AccountsUserPartialUpdateUsernameErrorComponent);
export type AccountsUserPartialUpdateValidationError = {
  type: ValidationErrorEnum;
  errors: AccountsUserPartialUpdateError[];
};
export type AccountsUserPartialUpdateErrorResponse400 =
  | ({
      type: "validation_error";
    } & AccountsUserPartialUpdateValidationError)
  | ({
      type: "client_error";
    } & ParseErrorResponse);
export type PatchedUserDetails = {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username?: string;
};
export type PatchedUserDetailsRead = {
  pk?: number;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username?: string;
  email?: string;
};
export const {
  useAccountsLoginCreateMutation,
  useAccountsLogoutCreateMutation,
  useAccountsPasswordChangeCreateMutation,
  useAccountsPasswordResetCreateMutation,
  useAccountsPasswordResetConfirmCreateMutation,
  useAccountsSignupCreateMutation,
  useAccountsSignupResendEmailCreateMutation,
  useAccountsSignupVerifyEmailCreateMutation,
  useAccountsTokenRefreshCreateMutation,
  useAccountsTokenVerifyCreateMutation,
  useAccountsUserRetrieveQuery,
  useAccountsUserUpdateMutation,
  useAccountsUserPartialUpdateMutation,
} = injectedRtkApi;
