"use client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "../../button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Drawer({
  title,
  content,
  icon,
  buttonAction,
}: {
  title: string;
  content: string;
  icon: IconProp;
  buttonAction: () => void;
}) {
  return (
    <div className="daisy-card daisy-collapse daisy-collapse-arrow bg-background-secondary">
      <input type="radio" name="my-accordion-2" />
      <div className="daisy-collapse-title text-xl font-medium gap-4 flex items-center">
        <FontAwesomeIcon icon={icon} />
        {title}
      </div>
      <div className="daisy-collapse-content">
        <p>{content}</p>
        <Button
          role="primary"
          className="mt-2 !p-4 !px-8 font-medium"
          onClick={buttonAction}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}
