# VueJS Particles icons

```
yarn add vue-particles-icons
```

## Usage

```
<template>
  <add-icon></add-icon>
</template>
<script>
import { AddIcon } from 'vue-particles-icons'

export default {
  components: { AddIcon }
}
</script>
```

or

```
<template>
  <particle name="add"></particle>
</template>
<script>
import Particle from 'vue-particles-icons'

export default {
  components: { Particle }
}
</script>
```

## Development

Build icons:
```
yarn build
```

Build demo:
```
yarn demo
```

View/modify demo:
```
yarn dev
```
