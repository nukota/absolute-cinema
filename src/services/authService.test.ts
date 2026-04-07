import { describe, expect, it, vi } from "vitest";
import { clearAuthData, storeAuthData } from "./authService";
import { UserRole } from "../utils/enum";
import { installTestStorage } from "../test/helpers";

const storage = installTestStorage();

describe("authentication storage", () => {
  it("stores tokens and normalizes legacy user names before caching", () => {
    const setQueryData = vi.fn();

    storeAuthData(
      {
        access_token: "access-token",
        refresh_token: "refresh-token",
        user: {
          id: "user-1",
          email: "user@example.com",
          full_name: "",
          name: "Legacy Name",
          role: UserRole.Customer,
        } as any,
      },
      { setQueryData },
    );

    expect(storage.getItem("access_token")).toBe("access-token");
    expect(storage.getItem("refresh_token")).toBe("refresh-token");
    expect(JSON.parse(storage.getItem("user")!)).toEqual({
      id: "user-1",
      email: "user@example.com",
      full_name: "Legacy Name",
      role: UserRole.Customer,
    });
    expect(setQueryData).toHaveBeenCalledWith(
      ["auth", "current"],
      expect.objectContaining({ full_name: "Legacy Name" }),
    );
  });

  it("removes every locally stored authentication value", () => {
    storage.setItem("access_token", "access-token");
    storage.setItem("refresh_token", "refresh-token");
    storage.setItem("user", "{}");
    const clear = vi.fn();

    clearAuthData({ clear });

    expect(storage.length).toBe(0);
    expect(clear).toHaveBeenCalledOnce();
  });
});
