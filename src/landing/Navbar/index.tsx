import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import Logo from "../Logo";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const links = [
    { href: "/why", label: "why" },
    { href: "/how", label: "how" },
    { href: "/faq", label: "faq" },
  ];

  return (
    <nav className={styles.nav}>
      <Logo />
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`${styles.link}`}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
