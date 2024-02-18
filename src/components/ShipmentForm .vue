<template>
  <div class="form-container">
    <div class="form-header">
      <h2>Create shipment</h2>
      <h4>To create a shipment, please fill in the required information in the fields below.</h4>
    </div>

    <form @submit.prevent="submitForm" class="form" v-if="!submit" >
      <!-- Shipper and Receiver Details -->
      <div class="form-details">
        <div
          v-for="(customer, index) in Object.keys(customerDetails)"
          :key="index"
          class="form-details-column"
        >
          <h3>{{ convertCamelCase(customer) }}</h3>
          <fieldset
            v-for="(postalDetails, index) in Object.keys(customerDetails[customer]).slice(0, 3)"
            :key="index"
            class="form-details-field"
          >
            <legend>{{ convertCamelCase(postalDetails) }}</legend>
            <div v-if="Array.isArray(customerDetails[customer][postalDetails])">
              <div
                class="input-details"
                v-for="(details, index) in Object.keys(customerDetails[customer][postalDetails][0])"
                :key="index"
              >
                <label for="postalCode">{{ convertCamelCase(details) }}:</label>
                <input
                  type="text"
                  id="postalCode"
                  v-model="customerDetails[customer][postalDetails][0][details]"
                  required
                />
              </div>
            </div>
            <div v-else>
              <div
                class="input-details"
                v-for="(details, index) in Object.keys(customerDetails[customer][postalDetails])"
                :key="index"
              >
                <label for="postalCode">{{ convertCamelCase(details) }}:</label>
                <input
                  type="text"
                  id="postalCode"
                  v-model="customerDetails[customer][postalDetails][details]"
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
              <input type="number" id="weight" v-model="content.packages[0].weight" required />
            </div>

            <div
              v-for="(pack, index) in Object.keys(content.packages[0].dimensions)"
              :key="index"
              class="input-details"
            >
              <label for="weight">{{ convertCamelCase(pack) }}:</label>
              <input
                type="number"
                id="weight"
                v-model="content.packages[0].dimensions[pack]"
                required
              />
            </div>
          </fieldset>
          <button type="submit" class="form-submit">Submit</button>
        </div>
      </div>
    </form>
    <PDF :pdfData=pdfData v-else/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import info from '../components/constants.js'
import PDF from './PDF.vue';

// If you need to modify the props, you can create local refs for them
const customerDetails = ref(info.customerDetails)
const content = ref(info.content)
const pdfData = ref('')
const submit = ref(false)
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    Authorization: 'Basic Y2xvdWRjYXJ0Qkc6SF4yckgjOWxSJDNpRV42eQ=='
  },
}
const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
const dhlApiUrl = 'https://express.api.dhl.com/mydhlapi/test/shipments';
const submitForm = () => {
  options.body = JSON.stringify(info)
  fetch(corsAnywhereUrl + dhlApiUrl, options)
    .then((response) => response.json())
    .then((response) =>  {pdfData.value =response.documents[1].content, submit.value=true, console.log(typeof response.documents[0].content)})
    .catch((err) => {alert(err),console.error(err)})
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
.form-submit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 5rem;
  height: 2rem;
  background-color: orange;
}
</style>
