import { ImageSourcePropType } from "react-native";
import { PalId } from "./data";

export const PAL_IMAGES: Record<PalId, { male: ImageSourcePropType; female: ImageSourcePropType }> = {
  reel: {
    male: require("@/assets/images/pals/ryder.png"),
    female: require("@/assets/images/pals/raquel.png"),
  },
  spotlight: {
    male: require("@/assets/images/pals/kareem.png"),
    female: require("@/assets/images/pals/kiana.png"),
  },
  system: {
    male: require("@/assets/images/pals/silas.png"),
    female: require("@/assets/images/pals/samira.png"),
  },
  evergreen: {
    male: require("@/assets/images/pals/cyrus.png"),
    female: require("@/assets/images/pals/clara.png"),
  },
};

export const PAL_PROFILES: Record<PalId, { male: ImageSourcePropType; female: ImageSourcePropType }> = {
  reel: {
    male: require("@/assets/images/pals/profiles/ryder.png"),
    female: require("@/assets/images/pals/profiles/raquel.png"),
  },
  spotlight: {
    male: require("@/assets/images/pals/profiles/kareem.png"),
    female: require("@/assets/images/pals/profiles/kiana.png"),
  },
  system: {
    male: require("@/assets/images/pals/profiles/silas.png"),
    female: require("@/assets/images/pals/profiles/samira.png"),
  },
  evergreen: {
    male: require("@/assets/images/pals/profiles/cyrus.png"),
    female: require("@/assets/images/pals/profiles/clara.png"),
  },
};
