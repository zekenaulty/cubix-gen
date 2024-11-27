// imageUploader.js
export async function uploadImage(file, scale = 0.5) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`http://localhost:171717/upload?scale=${scale}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json(); // { pixelColors, width, height }

    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw the error to be caught in createImageCubes
  }
}
