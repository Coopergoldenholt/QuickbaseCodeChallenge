import { useState } from 'react'

export const useForm = (initialValues: { [key: string]: string }) => {
    const [values, setValues] = useState(initialValues)

    return { values, setValues }
}