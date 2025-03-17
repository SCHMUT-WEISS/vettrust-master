// import { Controls, Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { ComponentProps } from "../../@types";

const AppLoader: React.FC<ComponentProps<{ loader: any }>> = ({
  className,
  loader
}) => (
  <div className={`h-[100vh] w-[100vw] bg-vtBG top-0 left-0 ${className}`}>
    {/* <Player
      autoplay
      loop
      src={loader}
      style={{ height: "300px", width: "300px" }}
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <Controls
        visible={false}
        buttons={["play", "repeat", "frame", "debug"]}
      />
    </Player> */}
  </div>
);

export default AppLoader;
