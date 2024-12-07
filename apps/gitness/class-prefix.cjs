const fs = require('fs')
const path = require('path')
const glob = require('glob') // Ensure glob is installed

// Define the prefix
const prefix = 'canary-'

// Define the directory to search
const directory = './src'

// Function to add prefix to classNames
function addPrefixToClasses(content) {
  return content.replace(/className="([^"]*)"/g, (match, classNames) => {
    const prefixedClasses = classNames
      .split(' ')
      .map(className => `${prefix}${className}`)
      .join(' ')
    return `className="${prefixedClasses}"`
  })
}

// Use glob.sync for synchronous file matching
const files = glob.sync(`${directory}/**/*.tsx`) // Adjust extension to .jsx if needed

files.forEach(file => {
  const filePath = path.resolve(file)
  const content = fs.readFileSync(filePath, 'utf-8')
  const updatedContent = addPrefixToClasses(content)
  fs.writeFileSync(filePath, updatedContent)
  console.log(`Updated: ${file}`)
})
