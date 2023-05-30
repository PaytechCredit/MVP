export function replaceNulls(data) {
  return JSON.parse(JSON.stringify(data).replace(/\:null/gi, ':""'));
}
