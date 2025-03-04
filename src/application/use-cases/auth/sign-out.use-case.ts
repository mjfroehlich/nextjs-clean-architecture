import { startSpan } from "@sentry/nextjs";
import { getAuthenticationService } from "@/di/modules/authentication.module";

import { Cookie } from "@/src/entities/models/cookie";

export function signOutUseCase(
  sessionId: string,
): Promise<{ blankCookie: Cookie }> {
  return startSpan({ name: "signOut Use Case", op: "function" }, async () => {
    const authenticationService = getAuthenticationService();

    return await authenticationService.invalidateSession(sessionId);
  });
}
