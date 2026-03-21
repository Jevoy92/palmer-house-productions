import { ImageSourcePropType } from "react-native";
import { PalId } from "./data";

export interface PalCharacterImages {
  male: ImageSourcePropType;
  female: ImageSourcePropType;
  maleTransparent: ImageSourcePropType;
  femaleTransparent: ImageSourcePropType;
}

export const PAL_IMAGES: Record<PalId, PalCharacterImages> = {
  reel: {
    male: require("@/assets/images/pals/reel-ryder.png"),
    female: require("@/assets/images/pals/reel-raquel.jpg"),
    maleTransparent: require("@/assets/images/pals/reel-ryder-transparent.png"),
    femaleTransparent: require("@/assets/images/pals/reel-raquel-transparent.png"),
  },
  spotlight: {
    male: require("@/assets/images/pals/spotlight-kareem.png"),
    female: require("@/assets/images/pals/spotlight-kiana.png"),
    maleTransparent: require("@/assets/images/pals/spotlight-kareem-transparent.png"),
    femaleTransparent: require("@/assets/images/pals/spotlight-kiana-transparent.png"),
  },
  system: {
    male: require("@/assets/images/pals/system-silas.png"),
    female: require("@/assets/images/pals/system-samira.png"),
    maleTransparent: require("@/assets/images/pals/system-silas-transparent.png"),
    femaleTransparent: require("@/assets/images/pals/system-samira-transparent.png"),
  },
  evergreen: {
    male: require("@/assets/images/pals/evergreen-cyrus.png"),
    female: require("@/assets/images/pals/evergreen-clara.png"),
    maleTransparent: require("@/assets/images/pals/evergreen-cyrus-transparent.png"),
    femaleTransparent: require("@/assets/images/pals/evergreen-clara-transparent.png"),
  },
};
