import { getSession } from "next-auth/react";

import SignupForm from "../components/signup/signup-form";

function SignupPage() {
  return <SignupForm />;
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

SignupPage.auth = false;
export default SignupPage;
