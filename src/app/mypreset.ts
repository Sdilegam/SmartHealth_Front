import {definePreset, palette} from "@primeng/themes";
import Aura from "@primeng/themes/Aura"

export const MyPreset = definePreset(Aura, {
  name: "MyPreset",
  semantic:{
    primary: palette("#fcb603")
  }
});

