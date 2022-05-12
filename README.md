# dgtek-portal-pits-editor

### Install
```
yarn add dgtek-portal-pits-editor
```

### Import

```js
import 'dgtek-portal-pits-editor'
import 'dgtek-portal-pits-editor/dist/dgtek-portal-pits-editor.css'
```

### Usage

```html
<Pits
  :host="host"
  :apiKey="apiKey"
  :credentials="credentials"
/>
```

### Listener for save data event

```js
window.addEventListener('pits-data-saved', function (event) {
  console.log(event.details)
})

// details: {
//   message: true,
//   messageType: 'Pits',
//   mesageText: 'Data saved'
// }
```
