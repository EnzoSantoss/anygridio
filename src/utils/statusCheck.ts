import { arrayStatus } from "../movidesk/class/ticket/defalutFields";
import { rangeValues } from "./rangeValues";

export function statusCheck(infoName: any, infoValue: any) {
  if (infoName === "status") {
    const [statusFiltered]: string[] = arrayStatus.filter((value) => {
      const infoValueUpperCase = infoValue.toLocaleUpperCase();
      if (value.startsWith(infoValueUpperCase)) {
        return value;
      }
    });
    console.log(statusFiltered);

    return statusFiltered;
  } else {
    return infoValue;
  }
}
