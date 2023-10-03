import FileEditor, {
  FileNotFound,
} from "@/components/panel/server/file-editor";

export default function ServerFileManager(props: {
  params: {
    server: string;
  };
  searchParams: {
    file?: string;
  };
}) {
  if (!props.searchParams.file) return <FileNotFound />;

  return (
    <FileEditor server={props.params.server} file={props.searchParams.file} />
  );
}
