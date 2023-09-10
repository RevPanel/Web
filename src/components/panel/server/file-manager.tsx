"use client";

import {
  faFile,
  faFolder,
  faFolderPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const files = [
  {
    name: "test.txt",
    type: "file",
    size: "1.2 KB",
    modified: "now",
  },
];

export default function FileManager() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-between rounded-xl bg-background-secondary p-4">
        <div className="flex items-center gap-4">
          <button
            className={
              "block h-8 w-8 rounded-lg " +
              (selected.length === files.length ? "bg-primary" : "bg-tertiary")
            }
            onClick={() => {
              if (selected.length === files.length) {
                setSelected([]);
              } else {
                setSelected(files.map((file) => file.name));
              }
            }}
          ></button>
          <p>/home</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="block h-8 w-8 rounded-lg bg-background">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button className="block h-8 w-8 rounded-lg bg-background">
            <FontAwesomeIcon icon={faFolderPlus} />
          </button>
          <button className="block h-8 w-8 rounded-lg bg-background">
            <FontAwesomeIcon icon={faFile} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-background-secondary p-4">
        {files.map((file) => (
          <div key={file.name} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className={
                  "block h-8 w-8 rounded-lg " +
                  (selected.includes(file.name) ? "bg-primary" : "bg-tertiary")
                }
                onClick={() => {
                  if (selected.includes(file.name)) {
                    setSelected((prev) =>
                      prev.filter((name) => name !== file.name)
                    );
                  } else {
                    setSelected((prev) => [...prev, file.name]);
                  }
                }}
              ></button>
              {file.type === "file" ? (
                <FontAwesomeIcon icon={faFile} className="text-xl" />
              ) : (
                <FontAwesomeIcon icon={faFolder} className="text-xl" />
              )}
              <p>{file.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <p>{file.size}</p>
              <p>{file.modified.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
