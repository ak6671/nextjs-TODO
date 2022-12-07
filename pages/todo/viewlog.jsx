import { redis } from "../api/lib/lib"

export async function getServerSideProps(context) {
  const entries = await redis.lrange("todo_log", 0, -1);
  return {
    props: { entries },
  };
}

export default function ViewLog(props) {
  return (
    <div>
      <h1>Api request log</h1>
      {props.entries.map((entry) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div>
            <pre>{JSON.stringify(entry, null, 2)}</pre>
          </div>
        );
      })}
    </div>
  );
}


