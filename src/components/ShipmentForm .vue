<template>
  <form @submit.prevent="submit" class="form">
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
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  shipmentDetails: {
    type: Object,
    required: true
  },
  submitForm: {
    type: Function,
    required: true
  }
})
const submit = () => {
  props.submitForm()
}
const shipmentDetails = props.shipmentDetails
const convertCamelCase = (key) => {
  const result = key.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}
</script>

