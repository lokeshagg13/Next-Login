import { getSession } from "next-auth/react";
import LoginForm from "../components/login/login-form";

function LoginPage() {
  return <LoginForm />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session !== null) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
    },
  };
}

LoginPage.auth = false;
export default LoginPage;
