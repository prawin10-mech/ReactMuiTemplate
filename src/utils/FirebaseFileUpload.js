import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const fileUploadToFirebase = async (file, type) => {
  try {
    // Add a preview property to the file object for convenience
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    const storageRef = ref(storage, `crmChat/${type}/${file.name}`);

    // Upload the file and wait for the upload to complete
    await uploadBytesResumable(storageRef, file);

    // Get the download URL and return it
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    // Handle errors gracefully
    console.error('File upload error:', error);
    return null;
  }
};
