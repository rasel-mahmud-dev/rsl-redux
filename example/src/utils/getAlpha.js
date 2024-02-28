

function getAlpha(color, alpha) {
    // Check if the color is in the format #RRGGBB or #RRGGBBAA
    if (color.length === 7 || color.length === 9) {
        // Extract the RGB components from the color
        let red = parseInt(color.slice(1, 3), 16);
        let green = parseInt(color.slice(3, 5), 16);
        let blue = parseInt(color.slice(5, 7), 16);

        // Extract the alpha value from the color
        let alphaHex = color.length === 9 ? parseInt(color.slice(7, 9), 16) : 255;

        // Normalize the alpha value to range between 0 and 1
        let normalizedAlpha = alpha * (alphaHex / 255);

        // Return the color with the specified alpha value
        return `rgba(${red}, ${green}, ${blue}, ${normalizedAlpha})`;
    } else {
        // If the color format is invalid, return null or throw an error
        return null;
    }
}

export default getAlpha