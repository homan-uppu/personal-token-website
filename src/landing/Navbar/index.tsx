import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import Logo from "../Logo";
import styles from "./Navbar.module.css";

const geistMono = Geist_Mono({ subsets: ["latin"] });

const Navbar = () => {
  const links = [{ href: "/white-paper", label: "WHITE PAPER" }];

  return (
    <nav className={styles.nav}>
      <Logo />
      <div className={styles.links}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${geistMono.className}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
