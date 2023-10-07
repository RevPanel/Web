"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkButton } from "../../button";

export default function Drawer({
  title,
  content,
  icon,
  link,
}: {
  title: string;
  content: string;
  icon: IconProp;
  link: string;
}) {
  return (
    <div className="daisy-collapse-arrow daisy-card daisy-collapse bg-background-secondary">
      <input type="radio" name="my-accordion-2" />
      <div className="daisy-collapse-title flex items-center gap-4 text-xl font-medium">
        <FontAwesomeIcon icon={icon} />
        {title}
      </div>
      <div className="daisy-collapse-content">
        <p>{content}</p>
        <LinkButton
          role="primary"
          className="mt-2 inline-block !p-4 !px-8 font-medium"
          href={link}
        >
          Proceed
        </LinkButton>
      </div>
    </div>
  );
}
