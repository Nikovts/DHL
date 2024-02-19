<template>
  <div class="form-container" v-if="!loading">
    <div v-if="!submit">
      <div class="form-header">
        <h2>Create waybill</h2>
        <h4>To create a waybill, please fill in the required information in the fields below.</h4>
      </div>
      <form @submit.prevent="submitForm" class="form">
        <!-- Shipper and Receiver Details -->
        <div class="form-details">
          <div
            v-for="(customer, index) in Object.keys(shipmentDetails.customerDetails)"
            :key="index"
            class="form-details-column"
          >
            <h3>{{ convertCamelCase(customer) }}</h3>
            <fieldset
              v-for="(postalDetails, index) in Object.keys(
                shipmentDetails.customerDetails[customer]
              ).slice(0, 3)"
              :key="index"
              class="form-details-field"
            >
              <legend>{{ convertCamelCase(postalDetails) }}</legend>
              <div v-if="Array.isArray(shipmentDetails.customerDetails[customer][postalDetails])">
                <div
                  class="input-details"
                  v-for="(details, index) in Object.keys(
                    shipmentDetails.customerDetails[customer][postalDetails][0]
                  )"
                  :key="index"
                >
                  <label for="postalCode">{{ convertCamelCase(details) }}:</label>
                  <input
                    type="text"
                    id="postalCode"
                    v-model="shipmentDetails.customerDetails[customer][postalDetails][0][details]"
                    required
                  />
                </div>
              </div>
              <div v-else>
                <div
                  class="input-details"
                  v-for="(details, index) in Object.keys(
                    shipmentDetails.customerDetails[customer][postalDetails]
                  )"
                  :key="index"
                >
                  <label for="postalCode">{{ convertCamelCase(details) }}:</label>
                  <input
                    type="text"
                    id="postalCode"
                    v-model="shipmentDetails.customerDetails[customer][postalDetails][details]"
                    required
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <!-- Package details -->
          <div class="form-details-column relative">
            <h3>Package details</h3>
            <fieldset class="form-details-field">
              <legend>Content</legend>
              <div class="input-details">
                <label for="weight">Weight:</label>
                <input
                  type="number"
                  id="weight"
                  v-model="shipmentDetails.content.packages[0].weight"
                  required
                />
              </div>

              <div
                v-for="(pack, index) in Object.keys(shipmentDetails.content.packages[0].dimensions)"
                :key="index"
                class="input-details"
              >
                <label for="weight">{{ convertCamelCase(pack) }}:</label>
                <input
                  type="number"
                  id="weight"
                  v-model="shipmentDetails.content.packages[0].dimensions[pack]"
                  required
                />
              </div>
            </fieldset>
            <button type="submit" class="button-submit">Submit</button>
          </div>
        </div>
      </form>
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
import WayBill from './WayBill.vue'
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

const convertCamelCase = (key) => {
  const result = key.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}
</script>

<style scoped>
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
