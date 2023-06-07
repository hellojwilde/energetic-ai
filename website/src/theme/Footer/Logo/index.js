import React from "react";
import Link from "@docusaurus/Link";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import styles from "./styles.module.css";
import clsx from "clsx";
import FooterLinkItem from "../LinkItem";

function LogoImage({ logo, ...otherProps }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const sources = {
    light: withBaseUrl(logo.src),
    dark: withBaseUrl(logo.srcDark ?? logo.src),
  };
  return (
    <ThemedImage
      alt={logo.alt}
      sources={sources}
      width={logo.width}
      height={logo.height}
      {...otherProps}
    />
  );
}
export default function FooterLogo({ logo }) {
  return (
    <div className={styles.footerLogo}>
      <Link href={logo.href} target={logo.target}>
        <LogoImage logo={logo} className={styles.footerLogoImage} />
      </Link>
      <div className="margin-left--md">
        <p className="footer__title">Real World Privacy</p>
        <ul className="footer__items clean-list">
          <li className={clsx("footer__item", styles.footerBrand)}>
            World-class data protection expertise, on-demand when you need it.
          </li>
          <li className="footer__item">
            <Link
              href={logo.href}
              target={logo.target}
              className="button button--secondary"
            >
              Learn More →
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
