import React from "react";
import clsx from "clsx";
import FooterSubscribe from "../Subscribe";
export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer
      className={clsx("footer", {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container container-fluid">
        <div className="row">
          <div className="col footer__col">{logo}</div>
          {links}
          <FooterSubscribe />
        </div>
        {(logo || copyright) && (
          <div className="footer__bottom margin-top--lg">{copyright}</div>
        )}
      </div>
    </footer>
  );
}
