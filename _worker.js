export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Rewrite request to R2 public endpoint
    // Example: https://pub-xxxx.r2.dev/WhoCompressed.mp4
    const r2Origin = `https://pub-1c90d57131af47bb83ef8cbe45591a57.r2.dev${url.pathname}`;

    const res = await fetch(r2Origin, request);

    // Clone headers & force cache
    const newHeaders = new Headers(res.headers);
    newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(res.body, {
      status: res.status,
      headers: newHeaders,
    });
  },
};
