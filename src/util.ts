/**
 * get epoch seconds
 * @returns current epoch seconds
 */
export function getCurrentEpoch(): number {
    return new Date().getTime() / 1000;
}

export function crop(s: string) {
    if (s?.indexOf('...') > -1) {
      return s.split('...')[0] + '...'
    } else {
      return s;
    }
}

export async function copyToClipboard(input: string | null) {
  if (!input) return;
  
  const type = "text/plain";
  const blob = new Blob([input], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  await navigator.clipboard.write(data);
  
  alert("Copied.");
}

export async function paste(): Promise<string> {
  return navigator.clipboard.readText()
}