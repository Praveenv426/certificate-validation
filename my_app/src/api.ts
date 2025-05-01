// src/api.ts
const BASE_URL = "http://127.0.0.1:8000/api/";

export const register = (data: any) =>
  fetch(`${BASE_URL}register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

export const login = (data: any) =>
  fetch(`${BASE_URL}login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

export const logout = () =>
  fetch(`${BASE_URL}logout/`, {
    method: "POST",
    credentials: "include",
  });

export const getProfile = () =>
  fetch(`${BASE_URL}profile/`, {
    credentials: "include",
  }).then((res) => res.json());

  export const uploadCertificate = async (formData: FormData) => {
    const response = await fetch("http://127.0.0.1:8000/api/upload-certificate/", {
      method: "POST",
      body: formData,
      credentials: "include", // Send cookies!
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Upload failed");
    }
  
    return await response.json();
  };
  