import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import particles from 'presslabs-particles-icons/dist/icons/particles-data.json'

const DEST_FOLDER = 'particles'

const components = []
const rootDir = path.join(__dirname, '..')
const viewBox = '0 0 512 512'

if (!fs.existsSync(DEST_FOLDER)) {
  fs.mkdirSync(DEST_FOLDER)
}

_.map(particles, (icon, key) => {
  const className = key.replace(/_\w/g, m => {
    const n = m.toUpperCase()
    return n[1]
  })

  const name = `${_.startCase(className).replace(/ /g, '')}Icon`
  const iconSvg = `<path d="${icon[0]}" transform="matrix(1 0 0 -1 0 512)" />`

  const component = `<template>
<svg
  fill="currentColor"
  preserveAspectRatio="xMidYMid meet"
  viewBox="${viewBox}"
  :height="computedSize"
  :width="computedSize"
  :style="{ verticalAlign: 'middle' }"
>
  ${iconSvg}
</svg>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
  },
  data: function() {
    return {
      computedSize: this.size,
    }
  },
}
</script>

`
  fs.writeFileSync(
    path.join(rootDir, `${DEST_FOLDER}/${key}.vue`),
    component,
    'utf-8',
  )

  components.push({
    name,
    file: `${key}`,
  })
})

const component = `<template>
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  preserveAspectRatio="xMidYMid meet"
  viewBox="${viewBox}"
  :height="size"
  :width="size"
  :style="{ verticalAlign: 'middle' }"
>
  <path :d="particleData" transform="matrix(1 0 0 -1 0 512)" />
</svg>
</template>
<script>
import iconsData from 'presslabs-particles-icons/dist/icons/particles-data.json'

export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    name: {
      type: String,
      required: true,
      default: 24
    }
  },
  computed: {
    particleData: function() {
      const name = this.name.replace(/_/g, '-')
      if (typeof (iconsData[name]) == "undefined") {
        console.error('Particle not found! Particle content must be a string and not contain any other HTML tags')
      }
      return iconsData[name]
    }
  },
}
</script>

`
fs.writeFileSync(
  path.join(rootDir, `${DEST_FOLDER}/particle.vue`),
  component,
  'utf-8',
)

const allImports = _.map(
  components,
  component => `import ${component.name} from './${component.file}'`,
)
allImports.push("import Particle from './particle'")
allImports.push('')
allImports.push('export {')
const allExports = _.map(components, component => `  ${component.name},`)
const all = allImports.concat(allExports)
all.push('  Particle')
all.push('}')

fs.writeFileSync(
  path.join(rootDir, DEST_FOLDER, 'index.js'),
  `${all.join('\n')}\n`,
  'utf-8',
)
