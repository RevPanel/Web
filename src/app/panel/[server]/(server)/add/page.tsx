"use client";

import { Button } from "@/components/button";
import FormInput from "@/components/input";
import Modal from "@/components/modal";
import useDisclosure from "@/hooks/disclosure";
import { useFetcher } from "@/hooks/fetcher";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

const promiseOptions = (inputValue: string) =>
  new Promise<any>(async (resolve) => {
    let url = "/api/images";
    if (inputValue && inputValue.length > 0) {
      url += `?q=${encodeURIComponent(inputValue)}`;
    }
    const { data } = await axios.get(url);
    resolve(
      data.map((image: { id: string; name: string }) => ({
        label: image.name,
        value: image.id,
      }))
    );
  });

function Range({
  name,
  bind,
  options,
}: {
  name: string;
  bind: [number, (value: number) => void];
  options: number[];
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-xs">{name}</label>

      <input
        type="range"
        min={0}
        max={options[options.length - 1]}
        value={bind[0]}
        onChange={(e) => bind[1](parseInt(e.target.value))}
        className="daisy-range daisy-range-primary daisy-range-xs"
      />
      <div className="flex w-full justify-between px-2 text-xs">
        {options.map((option) => (
          <span key={option}>{option}</span>
        ))}
      </div>
    </div>
  );
}

export default function Page({
  params: { server },
}: {
  params: {
    server: string;
  };
}) {
  const query = useSearchParams();
  const { data: defaultValue } = useFetcher(
    query.has("image") ? `/api/images?id=${query.get("image")}` : undefined
  );
  const [value, setValue] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [name, setName] = useState("");
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [disk, setDisk] = useState(0);
  const [envs, setEnvs] = useState<{ key: string; value: string }[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValue && defaultValue[0] && !value) {
      setValue({
        label: defaultValue?.[0]?.name,
        value: defaultValue?.[0]?.id,
      });
    }
  }, [defaultValue, value]);

  useEffect(() => {
    if (!value) return;

    axios.get(`/api/images/${value?.value}`).then(({ data }) => {
      setEnvs(
        data.environments.map((env: string) => ({
          key: env,
          value: "",
        }))
      );
    });
  }, [value]);

  return (
    <div className="mx-auto flex h-full w-3/5 flex-col items-center justify-center gap-4 xl:w-1/3">
      <h1 className="text-3xl font-extrabold">Create a new service</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          axios
            .post(`/api/servers/${server}/containers/create`, {
              name,
              image: value?.value,
              cpu,
              memory,
              disk,
              environment: envs.filter((env) => env.key && env.value),
            })
            .then((res) => redirect(`/panel/${server}/${res.data.id}`))
            .catch(({ response }) => setError(response.data.message));
        }}
        className="flex w-full flex-col gap-2"
      >
        {error && (
          <div className="rounded-lg bg-red-500 p-2 text-white">{error}</div>
        )}
        <FormInput
          required
          name="name"
          type="text"
          placeholder="Container Name"
          className="w-full py-4"
          bind={[name, setName]}
        />
        <AsyncSelect
          instanceId="select-image"
          classNames={{
            control: () =>
              "!bg-background-secondary !border-none py-2 !rounded-xl",
            input: () => "!text-white",
            option: (state) =>
              state.isFocused || state.isSelected
                ? "!bg-primary"
                : "!bg-background-secondary",
            menu: () => "!bg-background-secondary",
            singleValue: () => "!text-white",
          }}
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          defaultInputValue={defaultValue?.[0]?.name}
          value={value}
          onChange={(value) => setValue(value)}
          placeholder="Image"
        />

        <Range name="CPU" bind={[cpu, setCpu]} options={[25, 50, 75, 100]} />
        <Range
          name="Memory"
          bind={[memory, setMemory]}
          options={[25, 50, 75, 100]}
        />
        <Range name="Disk" bind={[disk, setDisk]} options={[1, 5, 10, 15]} />

        <div className="flex w-full gap-2">
          <Button type="submit" role="primary" className="w-full">
            Create
          </Button>
          <Button
            onClick={onOpen}
            type="button"
            role="secondary"
            className="w-full"
          >
            Edit Variables
          </Button>
        </div>
      </form>

      <EnvironmentModal
        isOpen={isOpen}
        onClose={onClose}
        envs={envs}
        setEnvs={setEnvs}
      />
    </div>
  );
}

function EnvironmentModal({
  envs,
  setEnvs,
  isOpen,
  onClose,
}: {
  envs: { key: string; value: string }[];
  setEnvs: (value: { key: string; value: string }[]) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="mb-4 w-fit text-2xl font-extrabold">
        Set your environment variables
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const inputs = (e.target as HTMLFormElement).getElementsByTagName(
            "input"
          );

          const variables = new Map<string, string>();
          for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];

            if (input.name === "key") {
              variables.set(input.value, "");
            } else {
              variables.set(
                (input.previousSibling as HTMLInputElement)?.value || "",
                input.value
              );
            }
          }

          setEnvs(
            envs.map((env) => ({
              key: env.key,
              value: variables.get(env.key) || "",
            }))
          );
          onClose();
        }}
        className="flex w-full flex-col gap-2"
      >
        {envs.map((variable, i) => (
          <div key={i} className="flex w-full gap-2">
            <FormInput
              key={i + variable.key}
              name="key"
              type="text"
              placeholder="Key"
              className="w-full !bg-background py-2"
              defaultValue={variable.key}
            />
            <FormInput
              name="value"
              type="text"
              placeholder="Value"
              className="w-full !bg-background py-2"
            />
          </div>
        ))}
        <div className="flex w-full gap-2">
          <Button type="submit" role="primary" className="w-full">
            Submit
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              const newEnvs = [...envs];
              newEnvs.push({ key: "", value: "" });
              setEnvs(newEnvs);
            }}
            type="button"
            role="secondary"
            className="w-full"
          >
            NEW
          </Button>
        </div>
      </form>
    </Modal>
  );
}
