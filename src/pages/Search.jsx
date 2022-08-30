import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Loading';

class Search extends React.Component {
  state = {
    nameArtist: '',
    nome: '',
    result: [],
    loading: false,
  };

  handleClick = async () => {
    const { nameArtist } = this.state;
    this.setState({ nameArtist: '' });
    this.setState({ loading: true }, async () => {
      const resultado = await searchAlbumsAPI(nameArtist);
      this.setState({ loading: false, result: resultado });
    });
  };

  render() {
    const { nameArtist, result, loading, nome } = this.state;
    return (
      <div data-testid="page-search">
        {
          !loading && (
            <div>
              <input
                data-testid="search-artist-input"
                type="text"
                value={ nameArtist }
                onChange={ ({ target: { value } }) => {
                  this.setState({ nameArtist: value, nome: value });
                } }
              />

              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ nameArtist.length < 2 }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </div>
          )
        }
        {
          loading && <Loading />
        }

        <div>
          {nome.length >= 2 && result.length > 0 ? (
            <div>
              <p>{`Resultado de álbuns de: ${nome}`}</p>
              {
                result.map((element, index) => (
                  <div key={ `${element.artistId} ${index}` }>
                    <img src={ element.artworkUrl100 } alt={ element.artistName } />
                    <p>{`Álbum ${element.trackCount} ${element.collectionName}`}</p>
                    <p>{`Artista ${element.artistName}`}</p>
                    <Link
                      data-testid={ `link-to-album-${element.collectionId}` }
                      to={ `/album/${element.collectionId}` }
                    >
                      Albúm
                    </Link>
                  </div>
                ))
              }
            </div>
          ) : (
            <p>Nenhum álbum foi encontrado</p>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
