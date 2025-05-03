import {definePreset, palette} from "@primeng/themes";
import Aura from "@primeng/themes/Aura"

export const DoctorPreset = definePreset(Aura, {
  name: "DoctorPreset",
  semantic:{
    primary: palette("#6ecc3f")
  }
});

