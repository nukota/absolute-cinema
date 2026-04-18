import { describe, expect, it, vi } from "vitest";
import { clearAuthData, storeAuthData } from "./authService";
import { UserRole } from "../utils/enum";

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

    expect(localStorage.getItem("access_token")).toBe("access-token");
    expect(localStorage.getItem("refresh_token")).toBe("refresh-token");
    expect(JSON.parse(localStorage.getItem("user")!)).toEqual({
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
    localStorage.setItem("access_token", "access-token");
    localStorage.setItem("refresh_token", "refresh-token");
    localStorage.setItem("user", "{}");
    const clear = vi.fn();

    clearAuthData({ clear });

    expect(localStorage.length).toBe(0);
    expect(clear).toHaveBeenCalledOnce();
  });
});
