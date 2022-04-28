import { AuthenticityRequest } from "../../generated/schema";
import {
  AuthenticityRegistry,
  AuthenticityRequested,
} from "../../generated/templates/AuthenticityRegistry/AuthenticityRegistry";

export function handleAuthenticityRequested(
  event: AuthenticityRequested
): void {
  const requestId = event.params.requestId;
  const registry = AuthenticityRegistry.bind(event.address);
  const scRequest = registry.s_authenticityRequests(requestId);

  const request = new AuthenticityRequest(requestId.toHex());
  request.collection = event.params.collection.toHex();
  request.tokenUri = scRequest.value1;
  request.tokenUriSignature = event.params.uriSignature.toHex();
  request.status = "Pending";
  request.save();
}
