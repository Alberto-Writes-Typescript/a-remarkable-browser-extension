export interface SerializedError {
  message: string
}

export function serialize (error: Error): SerializedError {
  return { message: error.message }
}

export function deserialize (errorPayload: SerializedError): Error {
  return new Error(errorPayload.message)
}
