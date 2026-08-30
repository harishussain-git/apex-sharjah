import { readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectDirectory = path.resolve(scriptDirectory, "..")
const configPath = path.join(
  projectDirectory,
  "lib",
  "sequence",
  "homeSequence.config.json",
)
const manifestPath = path.join(
  projectDirectory,
  "lib",
  "sequence",
  "homeSequence.manifest.json",
)
const frameNamePattern = /^\d{4}\.webp$/i

const fail = (message) => {
  throw new Error(`[home sequence] ${message}`)
}

const readConfig = async () => {
  const source = await readFile(configPath, "utf8")
  return JSON.parse(source)
}

const validateConfig = (config) => {
  if (!config.publicPath?.startsWith("/")) {
    fail("publicPath must start with a forward slash.")
  }

  if (!Array.isArray(config.sections) || !config.sections.length) {
    fail("At least one sequence section is required.")
  }

  if (!(config.initialLoadRatio > 0 && config.initialLoadRatio <= 1)) {
    fail("initialLoadRatio must be greater than 0 and no more than 1.")
  }

  const ids = new Set()
  const folders = new Set()

  for (const section of config.sections) {
    if (!section.id || !section.folder) {
      fail("Every section needs both an id and folder.")
    }

    if (ids.has(section.id)) {
      fail(`Duplicate section id: ${section.id}`)
    }

    if (folders.has(section.folder)) {
      fail(`Duplicate section folder: ${section.folder}`)
    }

    ids.add(section.id)
    folders.add(section.folder)
  }
}

const validateConfiguredFolders = async (sequenceDirectory, sections) => {
  const configuredFolders = new Set(sections.map((section) => section.folder))
  const entries = await readdir(sequenceDirectory, { withFileTypes: true })
  const unexpectedFolders = entries
    .filter((entry) => entry.isDirectory() && !configuredFolders.has(entry.name))
    .map((entry) => entry.name)

  if (unexpectedFolders.length) {
    fail(`Unconfigured folders found: ${unexpectedFolders.join(", ")}`)
  }
}

const inspectSection = async (sequenceDirectory, section, startFrame) => {
  const sectionDirectory = path.join(sequenceDirectory, section.folder)
  const entries = await readdir(sectionDirectory, { withFileTypes: true })
  const visibleFiles = entries.filter(
    (entry) => entry.isFile() && !entry.name.startsWith(".") && entry.name !== "Thumbs.db",
  )
  const invalidFiles = visibleFiles.filter((entry) => !frameNamePattern.test(entry.name))

  if (invalidFiles.length) {
    fail(
      `${section.folder} contains invalid files: ${invalidFiles
        .map((entry) => entry.name)
        .join(", ")}`,
    )
  }

  const frames = visibleFiles
    .map((entry) => ({ name: entry.name, number: Number.parseInt(entry.name, 10) }))
    .sort((first, second) => first.number - second.number)

  if (!frames.length) {
    fail(`${section.folder} does not contain any WebP frames.`)
  }

  frames.forEach((frame, index) => {
    const expectedNumber = index + 1

    if (frame.number !== expectedNumber) {
      fail(
        `${section.folder} must be numbered continuously. Expected ${String(
          expectedNumber,
        ).padStart(4, "0")}.webp but found ${frame.name}.`,
      )
    }
  })

  const frameCount = frames.length
  const endFrame = startFrame + frameCount - 1

  return {
    id: section.id,
    folder: section.folder,
    frameCount,
    startFrame,
    endFrame,
    mainFrame: endFrame,
  }
}

export async function calculateSequenceImages() {
  const config = await readConfig()
  validateConfig(config)

  const sequenceDirectory = path.join(
    projectDirectory,
    "public",
    ...config.publicPath.split("/").filter(Boolean),
  )

  await validateConfiguredFolders(sequenceDirectory, config.sections)

  const sections = []
  let nextStartFrame = 1

  for (const section of config.sections) {
    const inspectedSection = await inspectSection(
      sequenceDirectory,
      section,
      nextStartFrame,
    )

    sections.push(inspectedSection)
    nextStartFrame = inspectedSection.endFrame + 1
  }

  const frameCount = nextStartFrame - 1
  const manifest = {
    publicPath: config.publicPath,
    version: config.version,
    frameCount,
    initialFrameCount: Math.ceil(frameCount * config.initialLoadRatio),
    contentAnimation: config.contentAnimation,
    sections,
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8")

  return manifest
}

const manifest = await calculateSequenceImages()

console.log(
  `[home sequence] ${manifest.sections.length} sections, ${manifest.frameCount} frames`,
)
