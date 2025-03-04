import "reflect-metadata";

import {
  destroyContainer,
  getInjection,
  initializeContainer,
} from "@/di/container";
import { MockTodosRepository } from "@/src/infrastructure/repositories/todos.repository.mock";
import { MockUsersRepository } from "@/src/infrastructure/repositories/users.repository.mock";
import { MockAuthenticationService } from "@/src/infrastructure/services/authentication.service.mock";
import { afterEach, beforeEach, expect, it } from "vitest";
import { getAuthenticationService } from "@/di/modules/authentication.module";

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it("should use Mock versions of repos and services", async () => {
  const authService = getAuthenticationService();
  expect(authService).toBeInstanceOf(MockAuthenticationService);

  const usersRepository = getInjection("IUsersRepository");
  expect(usersRepository).toBeInstanceOf(MockUsersRepository);

  const todosRepository = getInjection("ITodosRepository");
  expect(todosRepository).toBeInstanceOf(MockTodosRepository);
});
