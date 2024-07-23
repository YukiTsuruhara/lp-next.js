export const onRequest = async (context) => {
  if (context.env.ENV !== "develop") {
    return;
  }

  const authorizationHeader = context.request.headers.get("Authorization");

  if (authorizationHeader) {
    const authValue = authorizationHeader.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    if (
      user === context.env.BASIC_USER &&
      password === context.env.BASIC_PASS
    ) {
      return await context.next();
    }
  }

  return new Response("Auth Required.", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="Secure Area"',
    },
  });
};
