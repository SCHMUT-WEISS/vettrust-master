import { CircularProgress, Dialog } from "@mui/material";
import {
  Heading,
  PlayButton,
  Section,
} from "@somethingcreative-agency/vettrust-design_system";
import { useLayoutEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/vimeo";
import { storyblokEditable } from "@storyblok/react";
import { VideoContentSectionStoryblok } from "../../../@types/generated/storyblok";
import muiTheme from "../../../shared/utils/mui-theme";
import BgCircleCanvasRight from "../../../assets/svg/bg-canvas-circles";

const QuoteIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="27"
      height="25"
      viewBox="0 0 27 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.48 24.08C18.4533 24.08 16.8533 23.36 15.68 21.92C14.5067 20.4267 13.92 18.3467 13.92 15.68C13.92 12.2667 14.88 9.14667 16.8 6.32C18.72 3.49333 21.9733 1.38667 26.56 0V4C25.2267 4.53333 24.08 5.12 23.12 5.76C22.2133 6.34667 21.52 7.04 21.04 7.84C20.6133 8.58667 20.4 9.49333 20.4 10.56C20.4 11.1467 20.56 11.6267 20.88 12C21.2533 12.3733 21.68 12.72 22.16 13.04C22.6933 13.3067 23.2 13.6533 23.68 14.08C24.2133 14.5067 24.64 15.0933 24.96 15.84C25.3333 16.5867 25.52 17.5733 25.52 18.8C25.52 20.5067 25.0133 21.8133 24 22.72C23.04 23.6267 21.8667 24.08 20.48 24.08ZM6.56 24.08C4.53333 24.08 2.93333 23.36 1.76 21.92C0.586667 20.4267 0 18.3467 0 15.68C0 12.2667 0.96 9.14667 2.88 6.32C4.8 3.49333 8.05333 1.38667 12.64 0V4C11.3067 4.53333 10.1867 5.12 9.28 5.76C8.37333 6.34667 7.68 7.04 7.2 7.84C6.72 8.58667 6.48 9.49333 6.48 10.56C6.48 11.1467 6.64 11.6267 6.96 12C7.33333 12.3733 7.76 12.72 8.24 13.04C8.77333 13.3067 9.28 13.6533 9.76 14.08C10.2933 14.5067 10.72 15.0933 11.04 15.84C11.4133 16.5867 11.6 17.5733 11.6 18.8C11.6 20.5067 11.12 21.8133 10.16 22.72C9.2 23.6267 8 24.08 6.56 24.08Z"
        fill="#D52F89"
      />
    </svg>
  );
};

interface VideoContentSectionBlokProps {
  blok: VideoContentSectionStoryblok;
}

export default function VideoContentSectionBlok({
  blok,
}: VideoContentSectionBlokProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [, setPlayButtonStyle] = useState({
    width: 0,
    height: 0,
  });

  // Used just to rerender once to have the player ready
  useLayoutEffect(() => {
    setPlayButtonStyle({
      width: videoRef.current?.offsetWidth || 0,
      height: videoRef.current?.offsetHeight || 0,
    });
  }, []);

  const [isPlayerLoading, setIsPlayerLoading] = useState(true);

  const handleCloseModal = () => {
    setOpen(false);
    setIsPlayerLoading(true);
  };

  const spacing = {
    default: "mt-32 lg:mt-48",
    narrow: "mt-24 lg:mt-32",
  };

  return (
    <>
      <div
        className={`container-wrapper vimeo-overlay min-h-[478px] flex flex-col lg:flex-row gap-[40px] lg:gap-[64px] ${
          spacing[blok.spacing]
        } z-[10] relative`}
        {...storyblokEditable({ ...blok })}
      >
        <BgCircleCanvasRight className="absolute right-[-400px] top-[calc(50%_-_400px)] z-[-1]" />
        <div className="relative w-full lg:w-[65%]  h-[320px] lg:h-[478px] border-[1px] border-solid border-[rgba(217, 206, 191, 0.4)] rounded-[12px] overflow-hidden">
          <div
            className="absolute z-[100] flex flex-col items-center justify-center"
            style={{
              width: videoRef.current?.offsetWidth,
              height: videoRef.current?.offsetHeight,
            }}
          >
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <PlayButton />
            </button>
          </div>
          <video
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-[12px] z-[1] ${
              isPlayerLoading ? "" : "opacity-[0.2]"
            }`}
            autoPlay={isPlayerLoading}
            muted
            loop
            ref={videoRef}
          >
            <source src={blok.vimeo[0].preview.filename} type="video/mp4" />
          </video>
        </div>
        <Section
          title={{
            text: blok.title,
            level: "h2",
            className: "",
          }}
          backgroundColor=""
          className="w-full lg:w-[29%]  flex flex-col justify-center"
          childrenContainerClassname="pt-[16px]"
        >
          <QuoteIcon className="text-magenta w-[27px] h-[24px]" />
          <Heading level="h4" className="mt-[16px]" text={blok.quote} />
        </Section>
      </div>
      <Dialog
        onClose={handleCloseModal}
        open={open}
        sx={{
          background: "transparent",
          [muiTheme.breakpoints.down("sm")]: {
            "& .MuiDialog-container .MuiDialog-paper": {
              margin: "0 20px !important",
            },
          },
        }}
        maxWidth="xl"
      >
        <div className="h-[198px] lg:h-[446px] w-full lg:w-[792px]">
          {isPlayerLoading && (
            <div className="grid [place-items:center] w-full h-full">
              <CircularProgress style={{ color: "darkblue" }} size={32} />
            </div>
          )}

          <ReactPlayer
            url={blok.vimeo[0].url}
            controls
            onReady={() => {
              setIsPlayerLoading(false);
            }}
            width="100%"
            height="100%"
          />
        </div>
      </Dialog>
    </>
  );
}
