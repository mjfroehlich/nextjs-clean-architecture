import { AuthenticationService } from "@/src/infrastructure/services/authentication.service";
import { MockAuthenticationService } from "@/src/infrastructure/services/authentication.service.mock";
import { UsersRepository } from "@/src/infrastructure/repositories/users.repository";
import { MockUsersRepository } from "@/src/infrastructure/repositories/users.repository.mock";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";

let authenticationService: IAuthenticationService | null = null;

// Get an AuthenticationService singleton instance, and create it if necessary.
export const getAuthenticationService = () => {
  if (!authenticationService) {
    authenticationService =  process.env.NODE_ENV === "test"
    ? new MockAuthenticationService(new MockUsersRepository())
    : new AuthenticationService(new UsersRepository());
  }
  return authenticationService;
};

// This binds the authentication service to the DI container lifecycle
export const destroyAuthenticationService = () => {
  authenticationService = null;
}