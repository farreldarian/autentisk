import { AuthenticityRequest } from '../../generated/schema'
import {
  AuthenticityFulfilled,
  AuthenticityRegistry,
  AuthenticityRequested,
} from '../../generated/templates/AuthenticityRegistry/AuthenticityRegistry'

export function handleAuthenticityRequested(
  event: AuthenticityRequested
): void {
  const requestId = event.params.requestId
  const registry = AuthenticityRegistry.bind(event.address)
  const scRequest = registry.s_authenticityRequests(requestId)

  const request = new AuthenticityRequest(requestId.toHex())
  request.collection = event.params.collection.toHex()
  request.tokenUri = scRequest.value1
  request.tokenUriSignature = event.params.uriSignature.toHex()
  request.status = 'Pending'
  request.save()
}

export function handleAuthenticityFulfilled(
  event: AuthenticityFulfilled
): void {
  const request = new AuthenticityRequest(event.params.requestId.toHex())
  request.similarity = event.params.similarityThreshold
  request.status = event.params.isAccepted ? 'Registered' : 'Rejected'
  request.save()
}
