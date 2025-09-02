import { authClient } from "@/lib/auth"; //import the auth client

const { data, error } = await authClient.signUp.email(
  {
    email,
    password,
    name,
    callbackURL: "/dashboard",
  },
  {
    onRequest: (ctx) => {
      //show loading
    },
    onSuccess: (ctx) => {
      //redirect to the dashboard or sign in page
    },
    onError: (ctx) => {
      // display the error message
      alert(ctx.error.message);
    },
  }
);

const { data, error } = await authClient.signIn.email(
  {
    /**
     * The user email
     */
    email,
    /**
     * The user password
     */
    password,
    /**
     * A URL to redirect to after the user verifies their email (optional)
     */
    callbackURL: "/dashboard",
    /**
     * remember the user session after the browser is closed.
     * @default true
     */
    rememberMe: false,
  },
  {
    //callbacks
  }
);
