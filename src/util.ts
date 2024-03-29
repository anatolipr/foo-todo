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