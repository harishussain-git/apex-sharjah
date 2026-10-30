import assert from "node:assert/strict"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

// Run after `npm run build` to check the actual server-rendered scripts.
const source = JSON.parse(readFileSync("content/structured-data.json", "utf8"))
const output = ".next/server/app"
const target = "cbse-school-sharjah.html"
const globalTypes = new Set(["WebSite", "School"])
const pages = readdirSync(output).filter((file) => file.endsWith(".html"))
assert(pages.includes(target), "Target page was not prerendered")

for (const file of pages) {
  const html = readFileSync(join(output, file), "utf8")
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attributes]) => /type="application\/ld\+json"/.test(attributes))
  // Next's internal error shells do not necessarily render the root layout.
  if (file.startsWith("_") && scripts.length === 0) continue
  assert.equal(scripts.length, file === target ? 2 : 1, `${file}: script count`)
  const entities = scripts.flatMap(([, , text]) => {
    const data = JSON.parse(text)
    assert.equal(data["@context"], source["@context"])
    return data["@graph"]
  })
  const expected = source["@graph"].filter((entity) =>
    file === target || globalTypes.has(entity["@type"]),
  )
  assert.deepEqual(entities, expected, `${file}: schema content/scope changed`)
  const ids = entities.map((entity) => entity["@id"])
  assert.equal(new Set(ids).size, ids.length, `${file}: duplicate entity IDs`)
  function checkReferences(value) {
    if (!value || typeof value !== "object") return
    if (Object.keys(value).length === 1 && value["@id"]) {
      assert(ids.includes(value["@id"]), `${file}: unresolved ${value["@id"]}`)
    }
    Object.values(value).forEach(checkReferences)
  }
  entities.forEach(checkReferences)
}

const urls = new Set()
function collectUrls(value) {
  if (typeof value === "string" && value.startsWith("https://www.apexsharjah.com")) {
    urls.add(new URL(value).pathname)
  } else if (value && typeof value === "object") {
    Object.values(value).forEach(collectUrls)
  }
}
collectUrls(source)
for (const path of urls) {
  const local = /\.[a-z]+$/i.test(path)
    ? join("public", path)
    : join(output, path === "/" ? "index.html" : `${path.slice(1)}.html`)
  assert(existsSync(local), `Missing referenced URL/asset: ${path}`)
}
console.log(`Validated rendered JSON-LD across ${pages.length} HTML files; all IDs resolve and ${urls.size} referenced URL paths exist.`)
