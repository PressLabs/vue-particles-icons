require('dotenv').config() // eslint-disable-line
const fs = require('fs')
const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const iconsData = require('presslabs-particles-icons/dist/icons/particles-data.json')

const components = []
const rootDir = path.join(__dirname, '..')

const DEST_FOLDER = 'particles'

if (!fs.existsSync(DEST_FOLDER)) {
  fs.mkdirSync(DEST_FOLDER)
}

const PARTICLES_PATH =
  process.env.PARTICLES_PATH || 'node_modules/presslabs-particles-icons/svg'

glob(path.join(rootDir, `${PARTICLES_PATH}/*.svg`), (err, icons) => {
  icons.forEach(iconPath => {
    const filename = path.basename(iconPath, '.svg')
    const name = `${_.capitalize(_.camelCase(filename))}Icon`
    components.push({
      component: name,
      file: `./${filename}`,
    })
    const component = `<template>
  <svg
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 64 64"
    :height="computedSize"
    :width="computedSize"
    :style="{ verticalAlign: 'middle' }"
  >
    <path d="${iconsData[filename]}" />
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
      path.join(rootDir, `${DEST_FOLDER}/${filename}.vue`),
      component,
      'utf-8',
    )
  })

  const component = `<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 64 64"
    :height="size"
    :width="size"
    :style="{ verticalAlign: 'middle' }"
  >
    <path :d="particleData" />
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
  const imports = _.map(
    components,
    component => `export ${component.component} from '${component.file}'`,
  )
  imports.push("\nimport Particle from './particle'")
  imports.push('export default Particle')
  fs.writeFileSync(
    path.join(rootDir, DEST_FOLDER, 'index.js'),
    `${imports.join('\n')}\n`,
    'utf-8',
  )
})
