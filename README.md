# dhl

This app allows users to submit shipment information to DHL Express for the purpose of creating a waybill.

If you use localhost because of the CORS issue, instead of making requests directly to the DHL API, make requests through the CORS proxy server. The proxy server will add the necessary CORS headers to the responses, allowing your Vue application to access the data without encountering CORS errors. If you don`t want to set up a CORS Proxy Server, please replace the value "" of VITE_PROXY_URL in .ENV file with "https://cors-anywhere.herokuapp.com/". Also go to https://cors-anywhere.herokuapp.com/corsdemo to temporaly unlock access to the corsdemo.

Please replace the value "" of VITE_API_KEY in .ENV file with your Api Key. This key you can get from here - https://developer.dhl.com/api-reference/dhl-express-mydhl-api#get-started-section

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
