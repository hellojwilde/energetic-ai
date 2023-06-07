import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import FooterLogo from "@theme/Footer/Logo";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLayout from "@theme/Footer/Layout";
import FooterLinkColumn from "./LinkColumn";
function Footer() {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;
  return (
    <FooterLayout
      style={style}
      links={(links || []).map((column, i) => (
        <FooterLinkColumn key={i} column={column} />
      ))}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}
export default React.memo(Footer);
