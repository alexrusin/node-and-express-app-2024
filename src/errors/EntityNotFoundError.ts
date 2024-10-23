import CustomError from "./CustomError";

class EntityNotFoundError extends CustomError<ErrorCode> {}
export default EntityNotFoundError;
