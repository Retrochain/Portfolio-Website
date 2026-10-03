import { onRequestPost } from "../functions/api/contact";

interface WorkerEnv {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({ error: "Method not allowed." }),
          {
            status: 405,
            headers: {
              "content-type": "application/json; charset=utf-8",
              allow: "POST",
              "cache-control": "no-store",
            },
          },
        );
      }

      return onRequestPost({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
