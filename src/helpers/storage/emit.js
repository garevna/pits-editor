export function emit (data) {
  const { eventType, ...details } = data
  this.eventHandler.dispatchEvent(Object.assign(new Event(eventType), { details }))
}
