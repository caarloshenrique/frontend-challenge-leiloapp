import { required, max, regex, numeric } from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} deve ser preenchido',
})

extend('max', {
  ...max,
  message: '{_field_} não deve ter mais do que {length} dígitos',
})

extend('min', {
  ...max,
  message: '{_field_} deve ter {length} dígitos',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} precisa ter 8 dígitos no formato 99.999-999',
})

extend('numeric', {
  ...numeric,
  message: '{_field_} deve ser um número Ex: 9',
})
