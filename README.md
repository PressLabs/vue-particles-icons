# VueJS Particles icons

```
yarn add vue-particles-icons
```

## Usage

Import individual icon

```
<template>
  <add-icon></add-icon>
</template>
<script>
import AddIcon from 'vue-particles-icons/add'

export default {
  components: { AddIcon }
}
</script>
```

or as single component with name attribute

```
<template>
  <particle name="add"></particle>
</template>
<script>
import Particle from 'vue-particles-icons/particle'

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
