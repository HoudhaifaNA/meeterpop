import errorHandler from "./errorHandler";

function withErrorHandler(fn: Function) {
  return async function (request: Request, ...args: any) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      console.log(error);

      return errorHandler(error);
    }
  };
}

export default withErrorHandler;
