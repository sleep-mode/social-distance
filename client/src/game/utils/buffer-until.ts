export function stringToBuffer(str: string) {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function bufferToString(buffer: any) {
  return (String.fromCharCode as any).apply(null, new Uint8Array(buffer));
}
