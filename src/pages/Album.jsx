import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    loading: false,
    salvo: [],
    data: [],
  };

  componentDidMount() {
    const comeco = async () => {
      await this.verificado();
      await this.api();
    };
    comeco();
  }

  verificado = async () => {
    const data = await getFavoriteSongs();
    this.setState({ salvo: data });
  };

  api = async () => {
    const { match: { params: { id } } } = this.props;
    const musica = await getMusics(id);
    this.setState({ data: musica });
  };

  handleHAndleHAndle = async (event) => {
    const { salvo } = this.state;
    const mapear = salvo.some((element) => element.trackName === event.trackName);
    if (mapear) {
      this.setState({ loading: true }, async () => {
        await removeSong(event);
        await this.verificado();
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await addSong(event);
        await this.checado();
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { loading, salvo, data } = this.state;
    return (
      <div data-testid="page-album">
        {
          loading ? <Loading />
            : (
              <div>
                {data.length > 0 && (
                  <div>
                    <p data-testid="artist-name">
                      {data[0].artistName}
                    </p>
                    <p data-testid="album-name">
                      {`${data[0].collectionName} (${data[0].artistName})`}
                    </p>
                  </div>
                )}
                {data.length > 0 && (
                  data.map((element, index) => (
                    index > 0 && (
                      <div key={ index } htmlFor={ index }>
                        Favorita
                        <input
                          data-testid={ `checkbox-music-${e.trackId}` }
                          type="checkbox"
                          id={ index }
                          onClick={ async () => {
                            await this.verificado();
                            await this.handleHAndleHAndle(element);
                          } }
                          checado={ salvo.length > 0 && (
                            salvo.some((elemento) => elemento.trackName === element
                              .trackName)
                          ) }
                        />
                        <MusicCard
                          previewUrl={ element.previewUrl }
                          trackName={ element.trackName }
                        />
                      </div>
                    )
                  ))
                )}
              </div>
            )
        }
        Album
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
