export async function onRequestGet(context) {
  return context.env.MY_BASIC_AUTH.fetch(context.request);
}
