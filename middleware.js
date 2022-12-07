import { NextResponse } from "next/server";
import { redis } from "./pages/api/lib/lib";

export function middleware(request) {
  const time = Date.now();
  const timeStr = new Date(time).toLocaleString();

  const logData = {
    time: timeStr,
    ip: request.ip,
    ua: request.headers,
    geo: request.geo,
    origin: request.nextUrl.origin,
    ua:request.headers.get('user-agent'),
     mobile: request.headers.get('sec-ch-ua-mobile'),
     platform: request.headers.get('sec-ch-ua-platform'),
     url: request.url,
  };


  

  redis.lpush("todo_log", logData);

  return NextResponse.redirect(new URL("/api/list", request.url));
}
export const config = {
  matcher: "/api/list1",
};
