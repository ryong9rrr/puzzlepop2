export class RemoteError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export const isRemoteError = (error: unknown): error is RemoteError => {
  return error instanceof RemoteError;
};
