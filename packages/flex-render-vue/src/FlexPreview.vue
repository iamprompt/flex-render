<script setup lang="ts">
import 'flex-render/css'

import { defineProps } from 'vue'

import { type FlexContainer, render } from 'flex-render'

defineProps<{ json: FlexContainer }>()
</script>

<template>
  <div v-html="render(json)"></div>
</template>
