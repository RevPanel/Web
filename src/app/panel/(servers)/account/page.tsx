import { getSession } from "@/components/auth";
import { Devices } from "@/components/panel/account/devices";
import Drawer from "@/components/panel/account/drawer";
import UpdateAvatar from "@/components/panel/account/update-avatar";
import UpdateDetails from "@/components/panel/account/update-details";
import UpdatePassword from "@/components/panel/account/update-password";
import { auth } from "@/lib/lucia";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound } from "next/navigation";

function OauthConnection({
  name,
  link,
  className,
  icon,
}: {
  name?: string;
  link: boolean;
  icon: IconProp;
  className?: string;
}) {
  return (
    <div
      className={
        "flex items-center gap-4 rounded-xl bg-background-secondary p-4 text-tertiary " +
        (className || "")
      }
    >
      <FontAwesomeIcon icon={icon} className="text-xl" />
      <p>{name}</p>
      {link ? (
        <p className="text-gradient ml-auto">Linked</p>
      ) : (
        <Link
          href={`/api/auth/login/${name?.toLowerCase()}`}
          className="text-gradient ml-auto"
        >
          Click to link
        </Link>
      )}
    </div>
  );
}

async function getOauthState() {
  const session = await getSession();
  if (!session)
    return {
      github: false,
      discord: false,
      google: false,
    };

  const keys = await auth.getAllUserKeys(session.user.userId);

  return {
    github: keys.some((k) => k.providerId === "github"),
    discord: keys.some((k) => k.providerId === "discord"),
    google: keys.some((k) => k.providerId === "google"),
  };
}

export default async function Page() {
  const session = await getSession();
  const state = await getOauthState();

  if (!session) return notFound();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Drawer
          title="Verify your email address"
          content="We have sent you a link to verify your email address"
          icon={faEnvelope}
          complete={session?.user.emailVerified}
        />
        <Drawer
          title="Setup 2fa authentication"
          content="Your account should be secure and you should not worry about hackers who wants to rob your account. Setup a two factor authentication to stay safe"
          icon={faLock}
          link="/panel/account/2fa"
          complete={session?.user.twoFactorEnabled}
        />
        <Drawer
          title="Add a new machine to the panel"
          content="Add your first machine to the panel and enjoy all our features"
          icon={faPlus}
          link="/panel"
          complete={session?.user.serverCreated}
        />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="xl:w-3/4">
          <h1 className="w-fit text-3xl font-extrabold uppercase">
            Update your details
          </h1>
          <div className="mt-4 flex flex-col items-center gap-4 md:items-start lg:flex-row">
            <UpdateAvatar
              name={session?.user.name || "Unknown"}
              avatar={session?.user.avatarUrl}
            />
            <UpdateDetails
              defaultName={session?.user.name || ""}
              defaultEmail={session?.user.email || ""}
            />
          </div>
        </div>
        <UpdatePassword />
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-extrabold uppercase">
            Oauth connections
          </h1>
          <div className="mt-4 flex flex-col gap-4">
            <OauthConnection
              name="GitHub"
              icon={faGithub}
              link={state.github}
            />
            <OauthConnection
              name="Google"
              icon={faGoogle}
              link={state.google}
            />
            <OauthConnection
              name="Discord"
              icon={faDiscord}
              link={state.discord}
            />
          </div>
        </div>
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-3xl font-extrabold uppercase">Devices</h1>
          <Devices />
        </div>
      </div>
    </div>
  );
}
