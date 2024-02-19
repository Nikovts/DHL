const corsAnywhereUrl = import.meta.env.VITE_PROXY_URL
const dhlApiUrl = 'https://express.api.dhl.com/mydhlapi/test'
const baseUrl = corsAnywhereUrl + dhlApiUrl
const apiKey = import.meta.env.VITE_API_KEY
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    Authorization: `Basic ${apiKey}`
  }
}

export const createShipment = async (shipmentDetails) => {
  options.body = JSON.stringify(shipmentDetails)

  try {
    const response = await fetch(`${baseUrl}/shipments`, options)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error.message)
    throw error
  }
}
