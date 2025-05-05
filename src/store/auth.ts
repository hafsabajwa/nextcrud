export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  if (refreshToken === "mock-refresh-token-456") {
    const newAccessToken = "new-mock-access-token-789";
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  }

  return null;
};
