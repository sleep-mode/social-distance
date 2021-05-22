export const BufferUtil = function () {
  return {
    from: function (str) {
      const buf = new ArrayBuffer(str.length * 2);
      const bufView = new Uint8Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    },
    toString: function (binary) {
      return (String.fromCharCode as any).apply(null, new Uint8Array(binary));
    },
  };
};
