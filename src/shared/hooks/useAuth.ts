import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_KEY = "isAuth";
const WALLET_KEY = "walletAddress";

export function loginFake(walletAddress: string) {
  localStorage.setItem(AUTH_KEY, "true");
  localStorage.setItem(WALLET_KEY, walletAddress);
}

export function logoutFake() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(WALLET_KEY);
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function getWalletAddress() {
  return localStorage.getItem(WALLET_KEY);
}

// Hook tiện lợi để dùng trong component
export function useRequireAuth(redirectTo = "/connect") {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const check = isAuthenticated();
    if (!check) navigate(redirectTo);
    else setAuthed(true);
  }, [navigate, redirectTo]);

  return authed;
}
