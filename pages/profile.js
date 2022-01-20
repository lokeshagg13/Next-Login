import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";

function ProfilePage(props) {
  return <UserProfile session={props.session} />;
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

ProfilePage.auth = true;
export default ProfilePage;
