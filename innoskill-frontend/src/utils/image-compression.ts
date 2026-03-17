"use client";

/**
 * Compresses an image (given as a base64 string) using canvas.
 * Returns a new base64 string (JPEG) with reduced size.
 */
export async function compressImage(
  base64Str: string,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.7
): Promise<string> {
  // If not an image (e.g. PDF), return original
  if (!base64Str.startsWith("data:image/")) {
    return base64Str;
  }

  return new Promise((resolve, reject) => {
    const img = new (window.Image as any)();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Handle scaling
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return resolve(base64Str); // Fallback
      }

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to JPEG with specified quality
      const compressed = canvas.toDataURL("image/jpeg", quality);
      resolve(compressed);
    };
    img.onerror = (err: any) => {
      console.error("Compression failed:", err);
      resolve(base64Str); // Fallback to original on error
    };
  });
}
