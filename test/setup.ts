import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./server";

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();

  get length() {
    return this.values.size;
  }

  clear() {
    this.values.clear();
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  key(index: number) {
    return [...this.values.keys()][index] ?? null;
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  setItem(key: string, value: string) {
    this.values.set(key, String(value));
  }
}

const storage = new MemoryStorage();

beforeAll(() => {
  vi.stubGlobal("localStorage", storage);
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  storage.clear();
  server.resetHandlers();
  vi.restoreAllMocks();
});

afterAll(() => {
  server.close();
  vi.unstubAllGlobals();
});
