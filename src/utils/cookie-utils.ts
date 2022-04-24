import { TCookie } from "../@type/types";

export function getToken(name: string): string {
  const matches: RegExpMatchArray | null = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}\]\\^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}

export function setToken(
  name: string,
  value: string | number | boolean,
  props: TCookie = {}
): void {
  if (typeof props.expires == "number" && props.expires) {
    const d = new Date();
    d.setTime(d.getTime() + props.expires * 1000);
    props.expires = d;
  }
  if (props.expires instanceof Date && props.expires) {
    props.expires = props.expires.toUTCString();
  }
  const cookieValue: string = encodeURIComponent(value);
  let updatedCookie: string = name + "=" + cookieValue;
  let propName: keyof TCookie;
  for (propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteToken(name: string): void {
  setToken(name, "", { path: "/", expires: -1 });
}
