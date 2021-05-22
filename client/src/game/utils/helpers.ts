export const encodeScore = (time: string) => {
  return parseInt(time.replaceAll(":", ""));
};
export const decodeScore = (score: number) => {
  const stringifiedScore = score.toString();
  const zerosToAdd = 5 - stringifiedScore.length;
  const prefix = (new Array(zerosToAdd).fill("0")).join("");
  const fiveDigitTime = `${prefix}${stringifiedScore}`;
  return fiveDigitTime.slice(0, 2) + ":" + fiveDigitTime.slice(2, 4) + ":" + fiveDigitTime[4];
}
