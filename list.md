# Unchecked Files

以下は `unchecked` ディレクトリ内のファイル一覧です。

<template>
  <ul>
    <li v-for="file in uncheckedFiles" :key="file.link">
      <a :href="file.link">{{ file.text }}</a>
    </li>
  </ul>
</template>

<script setup>
import { getUncheckedFiles } from './.vitepress/config.mts';

// unchecked ディレクトリ内のファイル一覧を取得
const uncheckedFiles = getUncheckedFiles();
</script>
