import { useContext, FormEvent, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import Image from 'next/image'

import { Input } from '../components/ui/Input/index'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../contexts/AuthContext'

import logoImg from '../../public/logo.svg'

import Link from 'next/link';

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if(email == '' || password === ''){
      alert('Preencha os Dados')
      return
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Natubanho - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="natubanho" />

       <div className={styles.login}>
          <form onSubmit={handleLogin}>
             <Input
                placeholder='Digite seu e-mail'
                type="text"
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
             />
             <Input
                placeholder='Digite sua senha'
                type="password"
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
             />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>

          </form>

          <Link href="/signup">
            <span className={styles.text}>Não possui uma conta? Cadastre-se</span>
          </Link>

       </div>
      </div>
    </>
  )
}
