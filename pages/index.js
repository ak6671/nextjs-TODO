import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
