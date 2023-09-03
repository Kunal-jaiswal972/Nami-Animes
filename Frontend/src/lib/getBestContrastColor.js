export default function getBestTextColorForBackground(bgColor) {
  // Helper function to calculate the relative luminance of a color
  if (bgColor === null) return true;
  function calculateRelativeLuminance(color) {
    const rgb = parseInt(color.slice(1), 16); // Convert hex to RGB
    const r = (rgb >> 16) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    const gammaCorrectedR =
      r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gammaCorrectedG =
      g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const gammaCorrectedB =
      b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return (
      0.2126 * gammaCorrectedR +
      0.7152 * gammaCorrectedG +
      0.0722 * gammaCorrectedB
    );
  }

  // Calculate the relative luminance of the background color
  const backgroundLuminance = calculateRelativeLuminance(bgColor);

  // Determine the text color based on luminance
  // const textColor = backgroundLuminance > 0.5 ? "#000000" : "#FFFFFF"; // Use black for light backgrounds and white for dark backgrounds

  return backgroundLuminance > 0.5;
}

