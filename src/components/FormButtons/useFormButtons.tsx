import { useFormikContext } from 'formik'
import { useT } from '../../translations'

const useFormButtons = () => {
  const t = useT()
  const { submitForm, resetForm } = useFormikContext()
  return { t, submitForm, resetForm }
}

export default useFormButtons
