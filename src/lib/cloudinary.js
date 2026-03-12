// src/lib/cloudinary.js
const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload an image File to Cloudinary.
 */
export async function uploadToCloudinary(file, folder = 'nexyuga') {
  return _upload(file, folder, 'image');
}

/**
 * Upload a raw file (PDF, DOCX, etc.) to Cloudinary.
 */
export async function uploadRawToCloudinary(file, folder = 'nexyuga') {
  return _upload(file, folder, 'raw');
}

async function _upload(file, folder, resourceType) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? 'Cloudinary upload failed');
  }

  const data = await res.json();
  return { url: data.secure_url, public_id: data.public_id };
}
