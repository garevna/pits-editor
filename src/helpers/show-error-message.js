export const showErrorMessage = (errorMessage) => {
  if (window[Symbol.for('vue.instance')]) {
    window[Symbol.for('vue.instance')].$emit('open-error-popup', {
      errorType: 'Pits',
      errorMessage
    })
  } else console.error(errorMessage)
}
