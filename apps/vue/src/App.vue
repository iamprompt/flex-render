<script setup lang="ts">
import 'flex-render-vue/css'

import { FlexPreview } from 'flex-render-vue'

import { FlexModules } from './utils/flex'
</script>

<template>
  <div class="m-8">
    <div v-for="item in FlexModules" :key="item.id">
      <div class="flex mt-8 mb-4 flex-col sm:flex-row sm:items-baseline">
        <div class="flex flex-row space-x-4">
          <h2 class="font-bold text-3xl text-white">{{ item.title || item.id }}</h2>
        </div>
        <span v-if="item.author" class="sm:ml-4 text-white text-sm">
          (By
          <a :href="item.authorUrl || '#'" rel="noreferrer" target="_blank"> {{ item.author }} </a>)
        </span>
      </div>
      <FlexPreview :json="item.json" />
    </div>
  </div>
</template>
