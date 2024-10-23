class CustomError<C extends string> extends Error {
  message: string;
  statusCode: number;
  code?: C;

  constructor({
    message,
    statusCode,
    code,
  }: {
    message: string;
    statusCode: number;
    code?: C;
  }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export default CustomError;
