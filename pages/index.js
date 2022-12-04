import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TODO Next App</title>
        <meta name="description" content="Todo app created using Next.js" />
        <link rel="icon" href="/bx-list-ol.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Todo App</a>
        </h1>

        <Link
          href={{
            pathname: "/todo",
          }}
          className="Go_to_link"
        >
          Go To the App
        </Link>
      </main>
    </div>
  );
}
