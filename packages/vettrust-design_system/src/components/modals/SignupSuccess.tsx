import { useAtom } from "jotai";
import React from "react";
import Heading from "../shared/Heading";
import Paragraph from "../shared/Paragraph";
import Button from "../shared/Button";
import { VtSuccess } from "../../assets/icons";
import {
  ComponentProps,
  VTAtom,
  ModalsState,
  UseVtTranslateType
} from "../../@types";

const SignupSuccess: React.FC<ComponentProps<SignupSuccessProps>> = ({
  currentModalAtom,
  useVtTranslate,
  router,
  customUseAtom,
}) => {
  const { t } = useVtTranslate();

  const [, setCurrentModal] = customUseAtom(currentModalAtom);
  return (
    <div className="bg-white flex flex-col justify-center items-center mt-[86px] mb-[126px] lg:w-[728px] mx-[20px] lg:mx-[0px]">
      <VtSuccess />
      <Heading
        text={t("SUCCESS_MODAL.TITLE")}
        level="h3"
        className="mt-[24px] text-center"
      />
      <Paragraph type="body_1" className="mt-[8px] text-center">
        {t("SUCCESS_MODAL.DESCRIPTION")}
      </Paragraph>
      <Button
        type="PRIMARY"
        size="lg"
        className="mt-[40px] w-full md:w-[121px]"
        onClick={() => setCurrentModal({ type: null, minWidth: "md" })}
        router={router}
      >
        {t("SUCCESS_MODAL.BUTTON")}
      </Button>
    </div>
  );
};

interface SignupSuccessProps {
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  router: any;
  customUseAtom: typeof useAtom;
}

export default SignupSuccess;
