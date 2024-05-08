export interface SerializedError {
  error: string
  message: string
}

export function serialize (error: Error): SerializedError {
  return { error: error.constructor.name, message: error.message }
}

export function deserialize (errorPayload: SerializedError): Error {
  return new Error(errorPayload.message)
}
