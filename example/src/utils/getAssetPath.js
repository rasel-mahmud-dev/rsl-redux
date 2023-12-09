function getAssetPath(link) {
    if(!link) return ""
    if(link.startsWith("http")) return link
    return  "/images/" + link
}

export default getAssetPath