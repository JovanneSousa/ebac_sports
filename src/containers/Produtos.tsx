import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'

import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store/reducers/cart'

import * as S from './styles'
import { toggleFav } from '../store/reducers/fav'
import { RootReducer } from '../store'

const ProdutosComponent = () => {
  const favoritos = useSelector((state: RootReducer) => state.fav.items)
  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((item) => item.id === produto.id)
  }

  const { data: produtos } = useGetProdutosQuery()

  const dispatch = useDispatch()

  const adicionarCarrinho = (produto: ProdutoType) => {
    dispatch(add(produto))
  }

  const favoritar = (produto: ProdutoType) => {
    dispatch(toggleFav(produto))
  }

  if (!produtos) {
    return <h3>Carregando...</h3>
  }

  return (
    <>
      <S.Produtos>
        {produtos.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            favoritar={favoritar}
            aoComprar={adicionarCarrinho}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
