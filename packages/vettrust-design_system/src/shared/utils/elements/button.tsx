/* eslint-disable indent,sonarjs/no-duplicated-branches */
import { ButtonType } from "../../../@types/components/buttons";

export const getLoaderColor = (type: ButtonType) => {
  if (["PRIMARY", "MAGENTA"].includes(type)) {
    return "white";
  }

  return "darkblue";
};
