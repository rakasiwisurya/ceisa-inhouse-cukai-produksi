let initialValue = {
  access_token: '',
  refresh_token: ''
}
export function setKeycloak(value) {
  initialValue = value
}
export function getKeycloak() {
  return initialValue
}
