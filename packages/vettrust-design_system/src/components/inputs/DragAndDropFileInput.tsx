/* eslint-disable no-use-before-define,react/require-default-props */
import React, { ReactNode, useCallback } from "react";
import { DropEvent, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { FocusRing } from "react-aria";
import { ComponentProps, UseVtTranslateType } from "../../@types";
import Paragraph from "../shared/Paragraph";
import { Bin, FileUpload } from "../../assets/icons";

interface DragAndDropFileInputProps {
  classes?: {
    container?: string;
    textsContainer?: string;
    dragActiveTextContainer?: string;
    dragInactiveTextContainer?: string;
  };
  dragActiveText: string | ReactNode;
  dragInactiveText: string | ReactNode;
  onDragEnd: (file: File[]) => void;
  focusRingClassName?: string;
  accept?: { [key: string]: string[] };
  fileUploadErrorKey?: string;
  useVtTranslate: UseVtTranslateType;
  labelKey?: string;
  withoutCleanup?: boolean;
}

const FilePreview: React.FC<
  ComponentProps<{ file: File; onRemove: (file: File) => void }>
> = ({ file, onRemove }) => (
  <div className="border border-sand-pressed max-w-[185px] bg-white flex flex-row items-center rounded-[8px] pl-[8px]">
    <div className="whitespace-nowrap truncate my-[4px]">
      {file.name.split(".pdf")[0]}
    </div>
    <div className=" whitespace-nowrap flex flex-row items-center">
      .{file.type.split("/")[1]}
      <span className="text-sand-pressed">{" | "}</span>
      <button
        type="button"
        onClick={() => onRemove(file)}
        className="mr-[8px] mt-[4px] hover:text-magenta"
      >
        <Bin />
      </button>
    </div>
  </div>
);

const DragAndDropFileInput = ({
  classes,
  dragActiveText,
  dragInactiveText,
  onDragEnd,
  focusRingClassName,
  accept,
  fileUploadErrorKey,
  useVtTranslate,
  withoutCleanup = false,
  labelKey
}: DragAndDropFileInputProps) => {
  const { t } = useVtTranslate("career");
  const acceptOption = accept || {
    "text/pdf": [".pdf"]
  };

  const [dragActiveClass, setDragActiveClass] = React.useState("");
  const [displayedFiles, setDisplayedFiles] = React.useState<File[]>([]);

  const onDragEnter = useCallback(() => {
    setDragActiveClass("border border-magenta text-magenta");
  }, []);

  const onDragLeave = useCallback(() => {
    setDragActiveClass("");
  }, []);

  const onDropAccepted = useCallback(
    (acceptedFiles: File[], _event: DropEvent, deleting = false) => {
      onDragEnd(acceptedFiles);
      if (withoutCleanup && !deleting)
        setDisplayedFiles([...acceptedFiles, ...displayedFiles]);
      else setDisplayedFiles(acceptedFiles);
      onDragLeave();
    },
    [onDragEnd, onDragLeave]
  );

  const onDropRejected = useCallback(() => {
    onDragLeave();
    toast.error(
      // @ts-ignore
      t(fileUploadErrorKey || "SIGNUP.MODAL.DRAG_N_DROP_INPUT_ERROR")[0]
    );
  }, [fileUploadErrorKey, onDragLeave, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDragEnter,
    onDragLeave,
    onDropAccepted,
    maxFiles: 3,
    onDropRejected,
    accept: acceptOption,
    maxSize: 1024 * 1024 * 20 // 20 MB
  });

  return (
    <div className={`rounded-[12px] relative z-[10] ${classes?.container}`}>
      {labelKey && (
        <span
          className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans"
        >
          {labelKey}
        </span>
      )}
      <FocusRing
        focusRingClass={`ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] ${focusRingClassName}`}
        isTextInput
      >
        <div
          {...getRootProps()}
          className={`border border-sand-pressed h-[120px] outline-none lg:h-[96px] rounded-[8px] flex flex-row justify-center cursor-pointer ${classes?.container} hover:border hover:border-magenta hover:text-magenta ${dragActiveClass}`}
        >
          <input {...getInputProps()} />
          <div className={`${classes?.textsContainer}`}>
            {isDragActive ? (
              <Paragraph
                type="body_2"
                className={`flex flex-col justify-center items-center h-full gap-[12px] ${classes?.dragActiveTextContainer}`}
              >
                <FileUpload />
                <span className="text-center">{dragActiveText}</span>
              </Paragraph>
            ) : (
              <Paragraph
                type="body_2"
                className={`flex flex-col justify-center items-center h-full gap-[12px] ${classes?.dragInactiveTextContainer}`}
              >
                <FileUpload
                  className={`hover:border hover:border-magenta hover:text-magenta ${dragActiveClass}`}
                />
                <span className="text-center">{dragInactiveText}</span>
              </Paragraph>
            )}
          </div>
        </div>
      </FocusRing>
      {displayedFiles.length !== 0 && (
        <div className="mt-[16px] flex  gap-[16px]">
          {displayedFiles.map((file: File) => (
            <FilePreview
              file={file}
              onRemove={(removedFile) => {
                onDropAccepted(
                  displayedFiles.filter(
                    (file) => file.name !== removedFile.name
                  ),
                  {} as DropEvent,
                  true
                );
              }}
              key={file.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DragAndDropFileInput;
