import { loadContentModules, validateContent } from './content-utils.mjs'

const content = await loadContentModules()
const result = validateContent(content)

if (result.issues.length) {
  console.error('content:check נכשל')
  result.issues.forEach((issue) => console.error(`ERROR: ${issue.message} [${issue.path}]`))
}

if (result.warnings.length) {
  result.warnings.forEach((issue) => console.warn(`WARNING: ${issue.message} [${issue.path}]`))
}

if (!result.issues.length) {
  console.log('content:check עבר')
}

process.exit(result.ok ? 0 : 1)
