import { useState, FormEvent, useContext } from 'react'

import Head from 'next/head'
import React from 'react'
import { setupAPIClient } from '../../../services/api'

import styles from './styles.module.scss'

import { toast } from 'react-toastify'
// import { ProductContext } from '../../../contexts/Teste'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

import Header from '../../../components/Header'

import { canSSRAuth } from '../../../utils/canSSRAuth'

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[]
}

export default function AddProduct({ categoryList }: CategoryProps) {
  // const { addProduct } = useContext(ProductContext)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setquantity] = useState('')
  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)

  const [loading, setLoading] = useState(false)
  
  function handleChangeCategory(event){
    setCategorySelected(event.target.value)
  }

  async function handleRegister(event: FormEvent){
    event.preventDefault()

    try{
      

      if(name === '' || price === '' || quantity === ''){
        toast.warning('Preencha todos os campos!')
        return
       }

      const data = { 
        name,
        price: Number(price),
        quantity: Number(quantity),
        categoryId: Number(categories[categorySelected].id),
       }
       
      const apiClient = setupAPIClient()

      await apiClient.post('/api/product', data)

      toast.success('Produto cadastrado com sucesso!')

    } catch(err) {
      console.log({err})
      toast.error("Erro ao cadastrar")
   }
  }

  return (
    <>
      <Head>
        <title>Gerenciador de Produtos</title>
      </Head>
      <div>
        <Header />
        
        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map(( item, index ) => {
                return(
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <Input 
              placeholder='Digite o nome do produto'
              type="text"
              className={styles.input}
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />

            <Input
              placeholder='Digite o preço do produto'
              type="text"
              className={styles.input}
              value={price}
              onChange={ (e) => setPrice(e.target.value) }
            />

            <Input
              placeholder='Digite a quant. a inserir'
              type="text"
              className={styles.input}
              value={quantity}
              onChange={ (e) => setquantity(e.target.value) }
            />

              <Button className={styles.buttonAdd}
                type="submit"
                loading={false}
                >
                Cadastrar
            </Button>
          </form>
        </main>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/api/category')
  console.log(response.data)

  return {
      props: {
        categoryList: response.data
      }
  }
})