"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import { useFetcher } from "@/hooks/fetcher";
import {
  faEdit,
  faFile,
  faFolder,
  faFolderPlus,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState, type DragEvent } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

type FileInfo = {
  name: string;
  type: "file" | "directory";
  size?: string;
  modified: Date;
};

function FileItem({
  file,
  selected,
  onSelect,
  setPath,
  download,
  move,
}: {
  file: FileInfo;
  selected: boolean;
  onSelect: () => void;
  setPath: () => void;
  download?: () => void;
  move: (file: string) => void;
}) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", file.name);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const data = event.dataTransfer.getData("text/plain");
    if (data) {
      move(data);
    }
  };

  return (
    <ContextMenuTrigger
      collect={() => ({ name: file.name })}
      id="file_manager_cm"
    >
      <div
        draggable
        className={
          "flex items-center justify-between " +
          (isDraggingOver && file.type === "directory" ? "bg-background" : "")
        }
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={selected}
            className={
              "daisy-checkbox-primary daisy-checkbox block h-8 w-8 rounded-lg"
            }
            onChange={onSelect}
          />

          <button
            className="flex items-center gap-2"
            onClick={() => {
              if (file.type === "directory") {
                setPath();
              } else {
                download?.();
              }
            }}
          >
            {file.type === "file" ? (
              <FontAwesomeIcon icon={faFile} className="text-xl" />
            ) : (
              <FontAwesomeIcon icon={faFolder} className="text-xl" />
            )}
            <p className="word-break overflow-hidden text-ellipsis whitespace-nowrap">
              {file.name}
            </p>
          </button>
        </div>
        {file.name !== ".." && (
          <div className="word-break flex items-center gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
            <p>{file.size}</p>
            <p>{moment(file.modified).fromNow()}</p>
          </div>
        )}
      </div>
    </ContextMenuTrigger>
  );
}

export default function FileManager(props: {
  server: string;
  service?: string;
}) {
  const [path, setPath] = useState<string>(props.service ? "" : "/home");
  const [selected, setSelected] = useState<string[]>([]);
  const [renaming, setRenaming] = useState<string>("");
  const [createType, setCreateType] = useState<"file" | "directory">("file");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const {
    isOpen: isRenameOpen,
    onOpen: onRenameOpen,
    onClose: onRenameClose,
  } = useDisclosure();

  const {
    data: files,
    isLoading,
    mutate,
  }: {
    data?: FileInfo[];
    isLoading: boolean;
    mutate: () => void;
  } = useFetcher(
    props.service
      ? `/api/servers/${props.server}/files/${props.service}/list?parent=${path}`
      : `/api/servers/${props.server}/files/root/list?parent=${path}`
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-between rounded-xl bg-background-secondary p-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={selected.length === files?.length}
            className={
              "daisy-checkbox-primary daisy-checkbox block h-8 w-8 rounded-lg "
            }
            onChange={() => {
              if (selected.length === files?.length) {
                setSelected([]);
              } else {
                setSelected(files?.map((file) => file.name) || []);
              }
            }}
          />
          <p>{path}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setCreateType("directory");
              onOpen();
            }}
            className="block h-8 w-8 rounded-lg bg-background"
          >
            <FontAwesomeIcon icon={faFolderPlus} />
          </button>
          <button
            onClick={() => {
              setCreateType("file");
              onOpen();
            }}
            className="block h-8 w-8 rounded-lg bg-background"
          >
            <FontAwesomeIcon icon={faFile} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-background-secondary p-4">
        <FileItem
          selected={false}
          onSelect={() => {}}
          setPath={() => {
            if (path === "/home") return;
            setPath((prev: string) => prev.slice(0, prev.lastIndexOf("/")));
          }}
          file={{
            name: "..",
            type: "directory",
            modified: new Date(0),
          }}
          move={(f: string) => {
            axios
              .post(
                "/api/servers/" +
                  props.server +
                  `/files/${props.service || "root"}/move?file=${path}/${f}`,
                {
                  newName: path + "/../" + f,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then(() => mutate())
              .catch(() => {});
          }}
        />

        {files?.map((file: FileInfo) => (
          <FileItem
            selected={selected.includes(file.name)}
            onSelect={() => {
              if (selected.includes(file.name)) {
                setSelected((prev) =>
                  prev.filter((name) => name !== file.name)
                );
              } else {
                setSelected((prev) => [...prev, file.name]);
              }
            }}
            setPath={() => {
              setPath((prev: string) => {
                return prev + "/" + file.name;
              });
            }}
            file={file}
            download={() => {
              const url = `/api/servers/${props.server}/files/${
                props.service || "root"
              }/download?file=${path}/${file.name}`;
              window.open(url, "_blank");
            }}
            move={(f: string) => {
              axios
                .post(
                  "/api/servers/" +
                    props.server +
                    `/files/${props.service || "root"}/move?file=${path}/${f}`,
                  {
                    newName: path + "/" + file.name + "/" + f,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then(() => mutate())
                .catch(() => {});
            }}
            key={file.name}
          />
        ))}
      </div>

      <CreateFileModal
        isOpen={isOpen}
        onClose={onClose}
        create={(name, type) => {
          axios
            .put(
              "/api/servers/" +
                props.server +
                `/files/${
                  props.service || "root"
                }/new?type=${type}&file=${path}/${name}`
            )
            .then(() => mutate())
            .catch(() => {});
        }}
        type={createType}
      />
      <RenameFileModal
        isOpen={isRenameOpen}
        onClose={onRenameClose}
        defaultName={renaming}
        rename={(name) => {
          axios
            .post(
              "/api/servers/" +
                props.server +
                `/files/${
                  props.service || "root"
                }/move?file=${path}/${renaming}`,
              {
                newName: path + "/" + name,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then(() => mutate())
            .catch(() => {});
        }}
      />

      <ContextMenu id="file_manager_cm">
        <MenuItem
          onClick={(_, { name }: { name: string }) => {
            if (name === "..") {
              return;
            }

            const base = props.service
              ? `/panel/${props.server}/${props.service}/files`
              : `/panel/${props.server}/files`;

            if (
              files?.find((file) => file.name === name)?.type === "directory"
            ) {
              return;
            }

            router.push(base + "/editor?file=" + path + "/" + name);
          }}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </MenuItem>
        <MenuItem
          onClick={(_, { name }: { name: string }) => {
            if (name === "..") {
              return;
            }

            setRenaming(name);
            onRenameOpen();
          }}
        >
          <FontAwesomeIcon icon={faPencil} /> Rename
        </MenuItem>
        <MenuItem
          onClick={(_, { name }: { name: string }) => {
            if (name === "..") {
              return;
            }

            axios
              .delete(
                "/api/servers/" +
                  props.server +
                  `/files/${props.service || "root"}/delete/${path}/${name}`
              )
              .then(() => mutate());
          }}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </MenuItem>
      </ContextMenu>
    </div>
  );
}

function CreateFileModal({
  isOpen,
  onClose,
  create,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  create: (name: string, type: "file" | "directory") => void;
  type: "file" | "directory";
}) {
  const [name, setName] = useState("");

  return (
    <Modal title={`Create a new ${type}`} isOpen={isOpen} onClose={onClose}>
      <div className="mt-4 flex w-full flex-col gap-4">
        <FormInput
          type="text"
          className="w-full !bg-background"
          placeholder="File name"
          bind={[name, setName]}
        />
        <Button
          onClick={() => {
            create(name, type);
            onClose();
          }}
          role="primary"
        >
          Create
        </Button>
      </div>
    </Modal>
  );
}

function RenameFileModal({
  isOpen,
  onClose,
  rename,
  defaultName,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultName: string;
  rename: (name: string) => void;
}) {
  const [name, setName] = useState(defaultName);

  return (
    <Modal title={`Rename ${defaultName}`} isOpen={isOpen} onClose={onClose}>
      <div className="mt-4 flex w-full flex-col gap-4">
        <FormInput
          type="text"
          className="w-full !bg-background"
          placeholder="File name"
          bind={[name, setName]}
        />
        <Button
          onClick={() => {
            rename(name);
            onClose();
          }}
          role="primary"
        >
          Create
        </Button>
      </div>
    </Modal>
  );
}
