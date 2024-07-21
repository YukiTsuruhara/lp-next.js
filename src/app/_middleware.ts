interface Env {
  MY_BASIC_AUTH: {
    fetch(request: Request): Promise<Response>;
  };
}

interface Request {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil(promise: Promise<any>): void;
}

export async function onRequestGet(context: Request) {
  return context.env.MY_BASIC_AUTH.fetch(context.request);
}
