/**
 * Utility functions for handling image processing in Canvas
 */

/**
 * Optimizes file size by converting to DataURL with reduced quality
 * @param file The File object to process
 * @returns A Promise resolving to the processed DataURL
 */
export const optimizeFileSize = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1600;
        
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        // Set canvas dimensions and draw image
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to DataURL with reduced quality
        const dataURL = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed
        resolve(dataURL);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = reader.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Process files before saving to optimize size and format
 * @param files The files object from Excalidraw
 * @returns The processed files object
 */
export const processFiles = async (files: { [id: string]: any }): Promise<{ [id: string]: any }> => {
  const processedFiles: { [id: string]: any } = {};
    for (const id in files) {
    const file = files[id];
    
    // Skip undefined or null files
    if (!file) {
      continue;
    }
    
    // Only process image files with valid type property
    if (file.type && typeof file.type === 'string' && file.type.startsWith('image/')) {
      try {
        // Process image file
        const optimizedDataURL = await optimizeFileSize(file);
        
        // Create a new blob for the optimized image
        const optimizedBlob = dataURLtoBlob(optimizedDataURL);
        
        processedFiles[id] = {
          ...file,
          dataURL: optimizedDataURL,
          size: optimizedBlob.size,
        };
      } catch (error) {
        console.error('Error processing image:', error);
        processedFiles[id] = file; // Use original file if processing fails
      }
    } else {
      // For non-image files or files without type property, use as is
      processedFiles[id] = file;
    }
  }
  
  return processedFiles;
};

/**
 * Convert a data URL to a Blob
 * @param dataURL The data URL to convert
 * @returns A Blob object
 */
const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};
