import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import {
  BlogFrontmatterSchema,
  type BlogFrontmatter,
} from '@/content/data/schema'

function parseFrontmatter(fileContent: string, sourcePath: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let rawMetadata: Record<string, string> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    rawMetadata[key.trim()] = value
  })

  const result = BlogFrontmatterSchema.safeParse(rawMetadata)
  if (!result.success) {
    // Zod's own error has no idea which of the 15+ .mdx files it came from
    // — surfacing the path here is the difference between a build failure
    // you can act on and one that sends you grepping through every post.
    throw new Error(
      `Invalid frontmatter in ${sourcePath}:\n${z.prettifyError(result.error)}`,
    )
  }
  const metadata: BlogFrontmatter = result.data

  return { metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent, filePath)
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'content', 'blog'))
}
