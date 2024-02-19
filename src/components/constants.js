const date = new Date()
date.setDate(date.getDate() + 1);
export const details = {
  plannedShippingDateAndTime: (date.toISOString().slice(0, -5))+' GMT+01:00',
  pickup: {
    isRequested: false
  },
  productCode: 'D',
  getRateEstimates: false,
  accounts: [
    {
      number: '316132891',
      typeCode: 'shipper'
    }
  ],
  valueAddedServices: [
    {
      serviceCode: 'IB',
      value: 10,
      currency: 'EUR',
      method: 'cash'
    }
  ],
  outputImageProperties: {
    printerDPI: 300,
    encodingFormat: 'pdf',
    imageOptions: [
      {
        typeCode: 'waybillDoc',
        templateName: 'ARCH_8x4',
        isRequested: true,
        hideAccountNumber: false,
        numberOfCopies: 1
      },
      {
        typeCode: 'label',
        templateName: 'ECOM26_84_001',
        isRequested: true
      }
    ],
    splitTransportAndWaybillDocLabels: true,
    allDocumentsInOneImage: false,
    splitDocumentsByPages: true,
    splitInvoiceAndReceipt: true,
    receiptAndLabelsInOneImage: false
  },
  customerDetails: {
    shipperDetails: {
      postalAddress: {
        postalCode: '1766',
        cityName: 'Sofia',
        countryCode: 'BG',
        addressLine1: 'Panorama Sofia street 5',
        addressLine2: 'fl.3',
        countryName: 'Bulgaria'
      },
      contactInformation: {
        email: 'sales@cloudcart.com',
        phone: '+359882919777',
        mobilePhone: '+359882919777',
        companyName: 'CloudCart AD',
        fullName: 'CloudCart AD'
      },
      registrationNumbers: [
        {
          typeCode: 'VAT',
          number: '206004146',
          issuerCountryCode: 'BG'
        }
      ],
      typeCode: 'business'
    },
    receiverDetails: {
      postalAddress: {
        postalCode: 'TW4 6FD',
        cityName: 'Hounslow',
        countryCode: 'GB',
        addressLine1: '200',
        addressLine2: 'Great South-West Rd',
        countryName: 'UNITED KINGDOM'
      },
      contactInformation: {
        email: 'recipient_create_shipmentapi@dhltestmail.com',
        phone: '1123123',
        mobilePhone: '256345123',
        companyName: 'DoCo Event Airline Catering',
        fullName: 'Hillary Dickins'
      },
      registrationNumbers: [
        {
          typeCode: 'VAT',
          number: '12345678',
          issuerCountryCode: 'GB'
        }
      ],
      typeCode: 'business'
    }
  },
  content: {
    packages: [
      {
        typeCode: '2BP',
        weight: 1,
        dimensions: {
          length: 1,
          width: 1,
          height: 1
        }
      }
    ],
    isCustomsDeclarable: false,
    description: 'Shipment Description',
    incoterm: 'DAP',
    unitOfMeasurement: 'metric'
  },
  getTransliteratedResponse: false,
  estimatedDeliveryDate: {
    isRequested: false,
    typeCode: 'QDDC'
  },
  getAdditionalInformation: [
    {
      typeCode: 'pickupDetails',
      isRequested: true
    }
  ]
}
