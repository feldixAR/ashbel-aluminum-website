import { buildReport, loadContentModules, validateContent } from './content-utils.mjs'

const content = await loadContentModules()
const validation = validateContent(content)

console.log(buildReport(content, validation))

process.exit(validation.ok ? 0 : 1)
