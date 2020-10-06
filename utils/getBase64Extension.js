module.exports = (b64) => {
  const mime = b64.substring("data:".length, b64.indexOf(";base64"));
  const ext = mime.match(/\/.+$/gi)[0].replace("/", "");
  if (ext === "vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return { mime, ext: "docx" };
  } else if (ext === "msword") {
    return { mime, ext: "doc" };
  }
  return { mime, ext };
};
