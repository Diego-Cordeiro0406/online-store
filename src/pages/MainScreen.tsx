import { useState } from 'react';
import { Link } from 'react-router-dom';

import CategoriesBar from '../components/CategoriesBar';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { Product } from '../types/typesApi';

interface MainScreenProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MainScreen(_props: MainScreenProps) {
  const [search, setSearch] = useState('');
  const [isTrue, setTrue] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [categoryInput, setCategoryInput] = useState<string | null>(null);

  const getValorRadio = (dataCategory: string) => {
    setCategoryInput(dataCategory);
  };

  async function sendProductsRequest() {
    if (categoryInput) {
      const returned = await getProductsFromCategoryAndQuery(search, categoryInput);
      setData(returned.results);
    } else {
      const returned = await getProductsFromCategoryAndQuery(search);
      setData(returned.results);
    }
    if (data.length === 0) setTrue(true);
  }

  return (
    <>
      <header>
        <input
          data-testid="query-input"
          onChange={ ({ target }) => setSearch(target.value) }
        />
        <button
          data-testid="query-button"
          onClick={ sendProductsRequest }
        >
          pesquisar
        </button>
        <Link data-testid="shopping-cart-button" to="/cart">
          <button>Carrinho</button>
        </Link>
      </header>
      <main>
        <CategoriesBar
          sendRadioValue={ getValorRadio }
          // eslint-disable-next-line react/jsx-no-bind
          sendProductsRequest={ sendProductsRequest }
        />
        {
          data.length === 0 && !isTrue && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
        {
          data.length === 0 && isTrue ? (
            <p data-testid="not-found-product">
              Nenhum produto foi encontrado
            </p>
          ) : data.map((product) => (
            <div data-testid="product" key={ product.id }>
              <h3>{product.title}</h3>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{`R$ ${product.price}`}</p>
            </div>
          ))
        }
      </main>
    </>

  );
}

export default MainScreen;
