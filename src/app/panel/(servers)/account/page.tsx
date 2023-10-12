import { getSession } from "@/components/auth";
import { Button } from "@/components/button";
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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Drawer
          title="Verify your email address"
          content="We will send you an link to verify your email address"
          icon={faEnvelope}
          link="/panel/account/verify-email"
        />
        <Drawer
          title="Setup 2fa authentication"
          content="Your account should be secure and you should not worry about hackers who wants to rob your account. Setup a two factor authentication to stay safe"
          icon={faLock}
          link="/panel/account/2fa"
        />
        <Drawer
          title="Add a new machine to the panel"
          content="Add your first machine to the panel and enjoy all our features"
          icon={faPlus}
          link="/panel"
        />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="xl:w-3/4">
          <h1 className="w-fit text-3xl font-extrabold uppercase">
            Update your details
          </h1>
          <div className="mt-4 flex flex-col items-center gap-4 md:items-start lg:flex-row">
            <UpdateAvatar avatar={session?.user.avatarUrl} />
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
        <div className="md:w-1/2">
          <h1 className="text-3xl font-extrabold uppercase">Devices</h1>
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            {/* todo: code backend <Devices name="Test" status={true} location="Test" ip="127.0.0.1" />
            <Devices
              name="Test"
              status={false}
              location="Test"
              ip="127.0.0.1"
            />
            <Devices
              name="Test"
              status={false}
              location="Test"
              ip="127.0.0.1"
            /> */}
          </div>
          <Button role="primary" className="mt-4 w-full !p-4 !px-8 font-medium">
            View more
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold uppercase">Your plan</h1>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex gap-12 rounded-xl bg-background-secondary p-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-extrabold">Pro plan:</h1>
              <p>
                You are currently using the free plan. You can upgrade to a paid
                plan to get more features.
              </p>
              <Button
                role="primary"
                className="mt-auto w-1/2 !p-4 !px-8 font-medium"
              >
                Change plan
              </Button>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">Features:</h1>
              <ul className="mt-4 flex list-inside list-disc flex-col gap-4">
                <li>Lorem Ipsum</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
