"use client";

import { Button } from "@/components/button";
import { useFetcher } from "@/hooks/fetcher";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";

export function FileNotFound() {
  return null;
}

export default function FileEditor(props: {
  server: string;
  service?: string;
  file: string;
}) {
  const { data: file, mutate } = useFetcher(
    `/api/servers/${props.server}/files/${
      props.service || "root"
    }/download?file=${props.file}&raw=true`
  );
  const [content, setContent] = useState(file);

  return (
    <div className="flex w-full flex-col gap-4">
      <Button
        role="primary"
        className="ml-auto w-60"
        onClick={() => {
          axios
            .post(
              `/api/servers/${props.server}/files/${
                props.service || "root"
              }/edit?file=${props.file}`,
              {
                content,
              }
            )
            .then(() => {
              mutate();
            });
        }}
      >
        Save
      </Button>
      <Editor
        height="70vh"
        defaultLanguage={props.file.split(".").pop()?.replace("yml", "yaml")}
        defaultValue={file}
        theme="vs-dark"
        onChange={(value) => setContent(value)}
      />
    </div>
  );
}
