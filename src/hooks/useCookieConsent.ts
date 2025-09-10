import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function useCookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = Cookies.get("cookie_consent");
    if (saved === "true") setConsent(true);
    else if (saved === "false") setConsent(false);
    else setConsent(null); // chưa quyết định
  }, []);

  const accept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 });
    setConsent(true);
  };

  const decline = () => {
    Cookies.set("cookie_consent", "false", { expires: 365 });
    setConsent(false);
  };

  return { 
    consent, 
    accept, 
    decline 
  };
}
