function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&#64; {currentYear} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
