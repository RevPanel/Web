import FileManager from "@/components/panel/server/file-manager";

export default function ServerFileManager(props: {
  params: {
    server: string;
    service: string;
  };
}) {
  return (
    <FileManager server={props.params.server} service={props.params.service} />
  );
}
