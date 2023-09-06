export interface ServerError {
  body: {
    message: string;
    statusCode: number;
  };
}
