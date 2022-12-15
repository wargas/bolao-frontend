import { useFormik } from 'formik'
import Loading from 'react-loading'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'
import Api from '../libs/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [token, setToken] = useLocalStorage('auth_token', '')

  const { handleSubmit, getFieldProps, isSubmitting } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { data } = await Api.post('login', values)

        if ('token' in data) {
          setToken(data.token)
          navigate('/')
        }
      } catch (error:any) {

        if(error?.response?.data?.message) {
          toast.error("Credenciais inválidas")
        } else {
          toast.error('Erro ao tentar logar')
        }
      }
    },
  })

  return (
    <div className="h-screen overflow-y-auto">
      <div className="w-full mx-auto mt-20 flex flex-col max-w-[400px]">
        <h1 className="font-extrabold text-2xl font-gray-700 mb-10">
          Informe email e senha
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="">Email:</label>
            <input
              {...getFieldProps('email')}
              type="text"
              placeholder="Email"
              className="rounded"
            />{' '}
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Senha:</label>
            <input
              {...getFieldProps('password')}
              type="password"
              placeholder="Senha"
              className="rounded "
            />
          </div>
          <button
            className="button primary flex items-center h-[2.8rem] justify-center"
            type="submit"
          >
            {isSubmitting ? (
              <Loading type="spin" width={18} height={18} />
            ) : (
              <span>Fazer Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
