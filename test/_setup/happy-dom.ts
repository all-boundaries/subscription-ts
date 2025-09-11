import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { expect } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach } from "bun:test";
import { cleanup } from "./render";

GlobalRegistrator.register();

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
