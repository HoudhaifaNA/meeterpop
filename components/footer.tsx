import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-black p-child py-8">
      <p className="font-medium text-sm text-white text-center">
        Copyright &copy; {currentYear} All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
