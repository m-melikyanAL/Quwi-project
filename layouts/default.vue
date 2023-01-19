<template>
  <div class="default-layout">
    <Nuxt />
  </div>
</template>

<script>
import auth from '../middleware/auth'
export default {
  name: 'default-layout',

  middleware: [auth],
}
</script>