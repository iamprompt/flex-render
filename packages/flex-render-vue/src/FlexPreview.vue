<script setup lang="ts">
import 'flex-render/css'

import { type FlexContainer, render } from 'flex-render'
import { defineProps } from 'vue'

defineProps<{ json: FlexContainer }>()
</script>

<template>
  <div v-html="render(json)" />
</template>
