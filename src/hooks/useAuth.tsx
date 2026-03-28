import { useState, useEffect, useCallback, createContext, useContext } from "react";

export type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
} | null;

interface AuthContextType {
  data: Session;
  status: "loading" | "authenticated" | "unauthenticated";
  update: () => Promise<void>;
}

// React Context handles the global session state
const AuthContext = createContext<AuthContextType>({
  data: null,
  status: "loading",
  update: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Session>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const sessionData = await res.json();
      if (Object.keys(sessionData).length > 0) {
        setData(sessionData);
        setStatus("authenticated");
      } else {
        setData(null);
        setStatus("unauthenticated");
      }
    } catch {
      setData(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <AuthContext.Provider value={{ data, status, update: fetchSession }}>
      {children}
    </AuthContext.Provider>
  );
}

// Drop-in replacement for next-auth/react useSession()
export function useSession() {
  return useContext(AuthContext);
}

// Drop-in replacement for next-auth/react signIn()
export async function signIn(provider: string, options?: any) {
  try {
    const csrfRes = await fetch("/api/auth/csrf");
    const { csrfToken } = await csrfRes.json();

    if (provider === "credentials") {
      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // NextAuth requires the csrf token logic
        body: JSON.stringify({ ...options, csrfToken, json: true }),
      });
      
      const data = await res.json();
      // If callbackUrl exists, navigate there. In SPA, reloading works smoothly.
      if (data.url && options?.redirect !== false) {
        window.location.href = data.url;
      }
      return data;
    } else {
      // Build form data to forcefully POST login provider natively
      const form = document.createElement("form");
      form.method = "POST";
      form.action = `/api/auth/signin/${provider}`;
      
      const csrfInput = document.createElement("input");
      csrfInput.type = "hidden";
      csrfInput.name = "csrfToken";
      csrfInput.value = csrfToken;
      form.appendChild(csrfInput);
      
      if (options?.callbackUrl) {
        const urlInput = document.createElement("input");
        urlInput.type = "hidden";
        urlInput.name = "callbackUrl";
        urlInput.value = options.callbackUrl;
        form.appendChild(urlInput);
      }
      
      document.body.appendChild(form);
      form.submit();
    }
  } catch (error) {
    console.error("Sign in failed:", error);
  }
}

// Drop-in replacement for next-auth/react signOut()
export async function signOut(options?: { callbackUrl?: string }) {
  try {
    const csrfRes = await fetch("/api/auth/csrf");
    const { csrfToken } = await csrfRes.json();
    
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/auth/signout";
    
    const csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "csrfToken";
    csrfInput.value = csrfToken;
    form.appendChild(csrfInput);
    
    const urlInput = document.createElement("input");
    urlInput.type = "hidden";
    urlInput.name = "callbackUrl";
    urlInput.value = options?.callbackUrl || window.location.origin;
    form.appendChild(urlInput);
    
    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error("Sign out failed:", error);
  }
}
