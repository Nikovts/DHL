<template>
  <div class="form-container" v-if="!loading">
    <div v-if="!submit">
      <div class="form-header">
        <h2>Create waybill</h2>
        <h4>To create a waybill, please fill in the required information in the fields below.</h4>
      </div>
      <ShipmentForm  :shipmentDetails="shipmentDetails" :submitForm="submitForm"/>    
    </div>

    <div v-else>
      <div class="pdf-header">
        <h2>Shipment Tracking Number: {{ shipment.shipmentTrackingNumber }}</h2>
        <button class="button-new" @click="newWaybill">New waybill</button>
      </div>
      <WayBill :pdfData="shipment.documents[1]?.content" />
    </div>
  </div>
  <div class="loader" v-else></div>
</template>

<script setup>
import { ref } from 'vue'
import { details } from '../components/constants.js'
import WayBill from '../components/WayBill.vue'
import ShipmentForm from '../components/ShipmentForm .vue'
import { createShipment } from '../api/api'

const shipmentDetails = ref(structuredClone(details))
const shipment = ref({})
const submit = ref(false)
const loading = ref(false)
const newWaybill = () => {
  shipmentDetails.value = structuredClone(details)
  submit.value = false
}
const submitForm = async () => {
  loading.value = true
  try {
    const response = await createShipment(shipmentDetails.value)

    shipment.value = response
    submit.value = true
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
</script>

<style>
.form-container {
  padding-top: 3rem;
  width: 100%;
}
.form-header {
  margin: 2rem 0;
}

.pdf-header {
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
}
.form {
  margin-top: 3rem;
}

.form-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.form-details-column {
  width: 22rem;
}
.form-details-field {
  margin-top: 1rem;
  background-color: cornsilk;
}
.relative {
  position: relative;
}
.input-details {
  display: flex;
  justify-content: space-between;
}
.button-submit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 5rem;
  height: 2rem;
  background-color: orange;
  cursor: pointer;
}

.button-new {
  background-color: orange;
  cursor: pointer;
}
.loader {
  margin: 15rem auto 0 auto;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

