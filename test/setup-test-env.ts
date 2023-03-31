import { installGlobals } from "@remix-run/node";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
import "@testing-library/jest-dom/extend-expect";

installGlobals();
const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();
