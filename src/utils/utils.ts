export function toCamelCase(str: string) {
  let newString = "";
  for (let i = 0; i < str.length; i++) {
    newString +=
      i === 0 || str[i - 1] === " "
        ? str[i].toUpperCase()
        : str[i].toLowerCase();
  }
  return newString;
}
