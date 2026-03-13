import React, { useEffect, useState } from "react";
import Navbar from "./components/Nav";
import Main from "./components/Main";
import TwoFactorPage from "./components/TwoFactorPage";
import Footer from "./components/Footer";
import "./App.css";

const TWO_FACTOR_PATH = "/two-factor";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    function syncPath() {
      setPath(window.location.pathname);
    }

    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  function goToTwoFactor() {
    window.history.pushState({}, "", TWO_FACTOR_PATH);
    setPath(TWO_FACTOR_PATH);
  }

  return (
    <>
      <Navbar />
      {path === TWO_FACTOR_PATH ? (
        <TwoFactorPage />
      ) : (
        <Main onAppleSignIn={goToTwoFactor} />
      )}
      <Footer />
    </>
  );
}
