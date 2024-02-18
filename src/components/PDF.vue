<template>
  <div>
    <iframe :src="pdfUrl" style="width: 100%; height: 600px;"></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  pdfData: {
    type: String,
    required: true
  }
})
    // const pdfData = 'base64_encoded_pdf_data_here'; // Replace with your base64 encoded PDF data
    const pdfUrl = ref('');

    onMounted(() => {
      // Convert base64 encoded PDF data to Blob
      const byteCharacters = atob(props.pdfData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Create URL for the Blob
      pdfUrl.value = URL.createObjectURL(blob);
    });

    onBeforeUnmount(() => {
      // Revoke the URL to release resources
      URL.revokeObjectURL(pdfUrl.value);
    });



</script>