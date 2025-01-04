type ErrorCode = "ERR_NF" | "ERR_VALID" | "ERR_AUTH";

type ValidationError = {
  error: {
    message: string;
    code: ErrorCode;
    errors: { message: string }[];
  };
};
