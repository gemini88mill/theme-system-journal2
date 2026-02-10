import { readFileSync } from 'node:fs'

const thresholdInput = process.argv[2]
const threshold = Number(thresholdInput)

if (!Number.isFinite(threshold)) {
  console.error('Coverage threshold argument is required, e.g. 70')
  process.exit(1)
}

const lcovPath = 'coverage/lcov.info'
const lcovText = readFileSync(lcovPath, 'utf8')
const lines = lcovText.split('\n')

let lineFoundTotal = 0
let lineHitTotal = 0

for (const line of lines) {
  if (line.startsWith('LF:')) {
    lineFoundTotal += Number(line.slice(3))
  }

  if (line.startsWith('LH:')) {
    lineHitTotal += Number(line.slice(3))
  }
}

if (lineFoundTotal === 0) {
  console.error('No line coverage data found in coverage/lcov.info')
  process.exit(1)
}

const coveragePercent = (lineHitTotal / lineFoundTotal) * 100

console.log(
  `Line coverage: ${coveragePercent.toFixed(2)}% (threshold: ${threshold.toFixed(2)}%)`,
)

if (coveragePercent < threshold) {
  console.error(
    `Coverage check failed: ${coveragePercent.toFixed(2)}% is below ${threshold.toFixed(2)}%`,
  )
  process.exit(1)
}
