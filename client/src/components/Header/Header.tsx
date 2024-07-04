import React from "react";
import style from "./Header.module.scss";

export default function Header() {
  return (
    <header className={style.commonHeader}>
      <img src="main_logo.svg" alt="" />
    </header>
  );
}
