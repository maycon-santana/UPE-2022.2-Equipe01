import { useState, FormEvent, useEffect } from "react";
import styles from './styles.module.scss'
import Header from "../../components/Header";
import Head from "next/head";
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'
import GetProducts from "../productManager/getProduct";
import { canSSRAuth } from "../../utils/canSSRAuth";

type ItemProps = {
  id: string;
  name: string;
}

interface ProductProps{
  productList: ItemProps[]
}

export default function Assessment({ productList }: ProductProps) {
  const [note, setNote] = useState("");
  const [comment, setComment] = useState("");
  const [products, setProducts] = useState<ItemProps[]>([]);
  const [productSelected, setProductSelected] = useState(0);

  useEffect(() => {
    async function loadProducts() {
      const apiClient = setupAPIClient();
      const response = await apiClient.get('/api/getproducts');
      setProducts(response.data);
    }
    loadProducts();
  }, []);

  function handleChangeProduct(event: React.ChangeEvent<HTMLSelectElement>) {
    setProductSelected(Number(event.target.value));
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    const parsedNote = parseFloat(note);
    // Verifica se a nota está entre 1 e 5
    if (note < 1 || note > 5) {
      toast.warning("A nota deve estar entre 1 e 5.")
      return;
    }
    
    const apiClient = setupAPIClient();
    await apiClient.post('/api/assessment', {
      note: note, 
      comment: comment, 
      productId: Number(products[productSelected].id),
    });

    toast.success('Avaliação cadastrada com sucesso!');
    setNote('');
    setComment('');
  };

  return (
    <>
      <Head>
        <title>Nova avaliação</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Avaliar Produto</h1>

          <form 
            className={styles.form}
            onSubmit={handleRegister}>

            <select value={productSelected} 
            className={styles.select} 
            onChange={handleChangeProduct}>
              {products.map((product, index) => (
                <option key={product.id} value={index}>
                  {product.name}
                </option>
              ))}
            </select>

            <input 
              type="number"
              placeholder='Digite a nota'
              className={styles.input} 
              value={note}
              onChange={(e) => setNote(parseFloat(e.target.value))}
            />

            <input 
              type="text"
              placeholder='Digite um comentário'
              className={styles.input} 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className={styles.buttonAdd} type='submit'>
              Adicionar Avaliação
            </button>
          </form>

        </main>
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
  
    const response = await apiClient.get('/api/getproducts')
    console.log(response.data)
  
    return {
        props: {
          productList: response.data
        }
    }
  })