// FILE: storageHelpers.js
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\firebase\storageHelpers.js
// PURPOSE: Upload and delete photos to/from Firebase Storage
 
import { storage } from './config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
 
// ─── Upload a single photo ───
// folder: 'talent-photos' or 'org-logos'
// userId: Firebase Auth UID
// file: File object from input
// index: photo index (0-9 for talent, 'logo' for org)
export async function uploadPhoto(folder, userId, file, index) {
  // Create a unique filename
  const extension = file.name.split('.').pop().toLowerCase();
  const fileName = `${folder}/${userId}/photo_${index}.${extension}`;
  const storageRef = ref(storage, fileName);
 
  // Upload
  await uploadBytes(storageRef, file);
 
  // Get download URL
  const url = await getDownloadURL(storageRef);
  return url;
}
 
// ─── Upload org logo ───
export async function uploadOrgLogo(userId, file) {
  const extension = file.name.split('.').pop().toLowerCase();
  const fileName = `org-logos/${userId}/logo.${extension}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
 
// ─── Delete a photo ───
export async function deletePhoto(photoURL) {
  try {
    const storageRef = ref(storage, photoURL);
    await deleteObject(storageRef);
  } catch (error) {
    // File might not exist, that's okay
    console.warn('Could not delete photo:', error.message);
  }
}