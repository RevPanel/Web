"use client";
import { Button } from "@/components/button";
import Devices from "@/components/panel/account/devices";
import Drawer from "@/components/panel/account/drawer";
import UpdateAvatar from "@/components/panel/account/update-avatar";
import UpdateDetails from "@/components/panel/account/update-details";
import UpdatePassword from "@/components/panel/account/update-password";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <p className="text-gradient ml-auto">{link ? "Linked" : "Not linked"}</p>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <div className=" flex flex-col gap-3">
        <Drawer
          title="Verify your email address"
          content="We will send you an link to verify your email address"
          icon={faEnvelope}
          buttonAction={() => {}}
        />
        <Drawer
          title="Setup 2fa authentication"
          content="Lorem ipsum"
          icon={faLock}
          buttonAction={() => {}}
        />
        <Drawer
          title="Add a new machine to the panel"
          content="Lorem ipsum"
          icon={faPlus}
          buttonAction={() => {}}
        />
      </div>
      <div className="mt-8 flex gap-6">
        <div>
          <h1 className="text-3xl font-extrabold uppercase">
            Update your details
          </h1>
          <div className="mt-4 flex justify-between gap-4">
            <UpdateAvatar />
            <UpdateDetails />
          </div>
        </div>
        <UpdatePassword />
      </div>
      <div className="mt-8 flex w-full gap-6">
        <div className="w-1/2">
          <h1 className="text-3xl font-extrabold uppercase">
            Oauth connections
          </h1>
          <div className="mt-4 flex flex-col gap-4">
            <OauthConnection name="Github" icon={faEnvelope} link={true} />
            <OauthConnection name="Github" icon={faGithub} link={false} />
            <OauthConnection name="Discord" icon={faDiscord} link={true} />
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-extrabold uppercase">Devices</h1>
          <div className="mt-4 flex gap-4">
            <Devices
              name="Test"
              status={true}
              location="Test"
              ip="127.0.0.1"
            />
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
            />
          </div>
          <Button role="primary" className="mt-4 w-full !p-4 !px-8 font-medium">
            View more
          </Button>
        </div>
      </div>
    </div>
  );
}
