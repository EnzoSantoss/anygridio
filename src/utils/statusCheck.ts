import { arrayStatus } from "../movidesk/class/ticket/defalutFields";

export function statusCheck(infoName: any, infoValue: any) {
  if (infoValue === "status") {
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
