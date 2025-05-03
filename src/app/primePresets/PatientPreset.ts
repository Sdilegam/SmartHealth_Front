import {definePreset, palette} from "@primeng/themes";
import Aura from "@primeng/themes/Aura"

export const PatientPreset = definePreset(Aura, {
  name: "PatientPreset",
  semantic:{
    primary: palette("#3fc4cc")
  }
});

