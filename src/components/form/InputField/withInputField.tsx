import React from 'react'
import { useField } from 'formik'
import {
  InputFieldAcceptProps,
  InputFieldProps,
} from '@components/form/InputField/interface'

const withInputField = (Component: React.FC<InputFieldProps>) => {
  function Hoc(props: InputFieldAcceptProps) {
    const [field, { error, touched }, { setValue }] = useField(props)

    const newProps = {
      ...props,
      ...field,
    }

    return <Component {...newProps} />
  }

  return Hoc
}

export { withInputField }
