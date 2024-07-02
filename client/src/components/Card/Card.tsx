import style from "./Card.module.scss";

export default function Card({ children }: { children: JSX.Element }) {
  return <div className={style.card}>{children}</div>;
}
