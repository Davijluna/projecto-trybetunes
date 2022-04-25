import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeArts: '',
      carregando: false,
      requisicao: [],
      encontrado: '',
      naoEncontrado: '',
      copiaArtis: '',
    };
    this.funcClear = this.funcClear.bind(this);
  }

  funcLength = (e) => {
    this.setState({
      nomeArts: e.target.value,
    });
  }

  async funcClear() {
    const { nomeArts } = this.state;

    this.setState({
      carregando: true,
    });

    const requisicao = await searchAlbumsAPI(nomeArts);

    this.setState({
      carregando: false,
      requisicao,
      nomeArts: '',
      encontrado: 'Resultado de álbuns de: ',
      naoEncontrado: 'Nenhum álbum foi encontrado',
      copiaArtis: nomeArts,
    });
  }

  render() {
    const numberArts = 2;
    const {
      nomeArts,
      carregando,
      requisicao,
      encontrado,
      naoEncontrado,
      copiaArtis,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          { carregando ? <Loading /> : (
            <div>
              <form>
                <input
                  type="text"
                  value={ nomeArts }
                  data-testid="search-artist-input"
                  onChange={ this.funcLength }
                />
                <button
                  type="submit"
                  disabled={ nomeArts.length < numberArts }
                  data-testid="search-artist-button"
                  onClick={ this.funcClear }
                >
                  Pesquisar
                </button>
              </form>
              <h2>
                {encontrado}
                {copiaArtis}
              </h2>
              {requisicao.length === 0
                ? <p>{naoEncontrado}</p> : (
                  requisicao.map(({
                    artistName,
                    collectionName,
                    artworkUrl100,
                    collectionId,
                  }, index) => (
                    <div key={ index }>
                      <p>{artistName}</p>
                      <p>{collectionName}</p>
                      <img
                        key={ artworkUrl100 }
                        src={ artworkUrl100 }
                        alt={ collectionName }
                      />
                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `/album/${collectionId}` }
                      >
                        Album
                      </Link>
                    </div>
                  ))
                )}
            </div>
          )}

        </div>
      </>

    );
  }
}

export default Search;
