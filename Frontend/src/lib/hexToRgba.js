export function hexToRgba(hex, opacity) {
  // Remove the hash character if it exists
  if (hex === null) return `rgba(255,255,255, ${opacity})`;
  hex = hex.replace(/^#/, "");

  // Parse the hex string into individual RGB values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGBA values as a string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
