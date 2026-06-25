import { spawnSync } from 'node:child_process'

const steps = [
  ['בדיקת תוכן', ['run', 'content:check']],
  ['lint', ['run', 'lint']],
  ['build', ['run', 'build']],
]

const npmCommand = process.platform === 'win32' ? process.env.ComSpec : 'npm'

for (const [label, args] of steps) {
  console.log(`\n=== ${label} ===`)
  const runArgs = process.platform === 'win32' ? ['/d', '/s', '/c', 'npm', ...args] : args
  const result = spawnSync(npmCommand, runArgs, { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error(`publish:check נעצר בשלב: ${label}`)
    process.exit(result.status || 1)
  }
}

console.log('\npublish:check עבר. אפשר לבצע commit ו-push בבטחה.')
