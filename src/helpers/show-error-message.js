export const showErrorMessage = (errorMessage) => {
  if (window[Symbol.for('vue.instance')]) {
    window[Symbol.for('vue.instance')].$emit('open-error-popup', {
      errorType: 'Polygons',
      errorMessage
    })
  } else console.error(errorMessage)
}
