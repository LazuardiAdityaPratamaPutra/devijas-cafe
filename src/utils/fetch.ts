export const fetchAPI = async (url: string, option: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...option,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Terjadi kesalahan pada server");
  }
  return await response.json();
};
