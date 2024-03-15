import getAlpha from "./getAlpha.js";

function changeThemeColor(theme) {

    const colors = {
        "primary-500": theme.color,
        "primary-500-01": getAlpha(theme.color, 0.1),
        "primary-500-02": getAlpha(theme.color, 0.2),
        "primary-500-03": getAlpha(theme.color, 0.3),
        "primary-500-04": getAlpha(theme.color, 0.4),
        "primary-500-05": getAlpha(theme.color, 0.5),
    }

    for (const colorsKey in colors) {

        document.documentElement.style.setProperty(
            "--" + colorsKey,
            colors[colorsKey]
        )
    }

    const tag = document.documentElement.querySelector("#theme-color")
    tag.setAttribute("content", colors["primary-500"])
}

export default changeThemeColor