export const readFileAsDataUrl = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onload = () => {
      resolve(fr.result);
    };

    fr.onerror = () => {
      reject(null);
    };

    fr.readAsDataURL(file);
  });
};
