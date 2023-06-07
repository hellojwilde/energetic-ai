import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function FooterSubscribe() {
  return (
    <div className={clsx("col", styles.subscribe)}>
      <div className="footer__title">Newsletter</div>
      <div className="footer__items">
        <p className="footer__item">
          Learn to make data privacy attainable, practical and valuable.
        </p>
        <form
          className="footer__item"
          action="https://app.convertkit.com/forms/3332155/subscriptions"
          method="post"
        >
          <input
            type="email"
            name="email_address"
            placeholder="Your email"
            aria-label="Email"
            id="ck-email"
            className={styles.input}
          />
          <button
            type="submit"
            className="button button--primary margin-left--sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
