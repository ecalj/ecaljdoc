<template>
  <ul>
    <li v-for="file in pdfFiles" :key="file.link">
      <a :href="file.link" target="_blank">{{ file.name }}</a>
    </li>
  </ul>
</template>

<script setup>
  const pdfFiles = Object.entries(import.meta.glob('/unchecked/**/*.pdf')).map(([path]) => {
  const name = path.split('/').pop(); // ファイル名を取得
  return { link: path, name };
});
</script>
