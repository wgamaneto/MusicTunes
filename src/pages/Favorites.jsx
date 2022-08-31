import React from 'react';
// import PropTypes from 'prop-types';

import MusicCard from '../components/MusicCard';
import Loading from '../Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorite extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    const musica = async () => {
      this.setState({ loading: true }, async () => {
        const data = await getFavoriteSongs();
        this.setState({ data, loading: false });
      });
    };
    musica();
  }

  verificado = async () => {
    const data = await getFavoriteSongs();
    this.setState({ data });
  };

  handleHandleHAndle = async (event) => {
    this.setState({ loading: true }, async () => {
      await removeSong(event);
      await this.verificado();
      this.setState({ loading: false });
    });
  };

  render() {
    const { loading, data } = this.state;
    return (
      <div data-testid="page-favorites">
        {
          loading ? (
            <Loading />
          ) : (
            data.map((element, index) => (
              <div key={ element.artistId } htmlFor={ index }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${element.trackId}` }
                  type="checkbox"
                  id={ index }
                  onClick={ async () => {
                    await this.handleHandleHAndle(element);
                    await this.verificado();
                  } }
                  checado={ data.length > 0 && (
                    data.some((elemento) => elemento.trackName === element.trackName)
                  ) }
                />
                <MusicCard
                  previewUrl={ element.previewUrl }
                  trackName={ element.trackName }
                />
              </div>
            ))
          )
        }
      </div>
    );
  }
}

export default Favorite;
