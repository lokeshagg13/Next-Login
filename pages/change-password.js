import { getSession } from "next-auth/react";
import ChangePasswordForm from "../components/profile/change-password-form";

function ChangePasswordPage(props) {
  return <ChangePasswordForm session={props.session} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session === null) {
    return {
      redirect: {
        destination: "/login",
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

ChangePasswordPage.auth = true;
export default ChangePasswordPage;
