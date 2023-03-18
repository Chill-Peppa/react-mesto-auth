import React from "react";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copy">&copy; {date} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
