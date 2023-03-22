import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const handleOnEnter = () => {
    navigate("/sign-in", { replace: true });
  };

  return (
    <>
      <Header email="" text="Назад" onClick={handleOnEnter} />
      <section className="sign">
        <div className="sign__up-zone">
          <h2 className="sign__header">404 - Page Not Found 🥺</h2>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
