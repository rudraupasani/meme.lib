/**
 * Utility to download a video from a URL in the browser, bypassing CORS navigation restrictions.
 * If fetch fails (due to CORS or network issues), it gracefully falls back to opening the video in a new tab.
 * 
 * @param {string} videoUrl - The direct URL of the video to download.
 * @param {string} title - The title of the meme, which will be formatted into the filename.
 * @returns {Promise<boolean>} Resolves to true if downloaded via blob, false if used fallback.
 */
export async function downloadVideo(videoUrl, title) {
  try {
    const response = await fetch(videoUrl, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch video file');
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = blobUrl;
    // Format title: replace spaces and special characters with underscores
    const safeTitle = title.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    a.download = `${safeTitle || 'meme'}.mp4`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Revoke object URL after a delay to ensure the browser has started the download
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Failed to download video using Blob, using fallback link:', error);
    
    // Fallback: Open in a new tab
    const a = document.createElement('a');
    a.href = videoUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    return false;
  }
}
