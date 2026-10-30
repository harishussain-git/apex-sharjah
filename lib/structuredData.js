import structuredData from "@/content/structured-data.json"

const graph = structuredData["@graph"]
const globalTypes = new Set(["WebSite", "School"])

// Preserve the supplied graph while controlling where its entities render.
export const SITE_STRUCTURED_DATA = {
  "@context": structuredData["@context"],
  "@graph": graph.filter((entity) => globalTypes.has(entity["@type"])),
}

export const CBSE_SCHOOL_SLUG = "cbse-school-sharjah"

export const CBSE_SCHOOL_STRUCTURED_DATA = {
  "@context": structuredData["@context"],
  "@graph": graph.filter((entity) => !globalTypes.has(entity["@type"])),
}
