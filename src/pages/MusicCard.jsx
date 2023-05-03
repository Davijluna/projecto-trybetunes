import propTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import {
  getFavoriteSongs,
  addSong,
  removeSong,
} from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: [],
    };
    this.musicaFavorita = this.musicaFavorita.bind(this);
  }

  async componentDidMount() {
    const music = await getFavoriteSongs();
    this.setState({
      favorite: music,
    });
  }

  // musicaFavorita = (target) => {
  //   const textChekd = target.type === 'checkbox' ? target.checked : target.value;
  //   this.setState({
  //     checked: textChekd,
  //   });
  //   const { favoritas } = this.state;
  //   return favoritas.find((som) => som.trackId === music.trackId);
  // }
  // Tive ajuda de Andre e Guilherme
  isFavorite = (trackId) => {
    const { favorite } = this.state;
    const texte = favorite.some((element) => element.trackId === trackId);
    return texte;
  };

  async musicaFavorita({ target }) {
    const { song } = this.props;
    this.setState({
      loading: true,
    });
    if (target.checked) {
      await addSong(song);
      // this.setState({
      //   isChecked: true,
      // });
    } else {
      await removeSong(song);
      // this.setState({
      //   isChecked: false,
      // });
    }

    const favoretes = await getFavoriteSongs();

    this.setState({
      loading: false,
      favorite: favoretes,
    });
  }

  // adicionarMusica = async () => {
  //   const { song } = this.props;
  //   this.setState({
  //     loading: true,
  // });
  //   const favoritas = await getFavoriteSongs();
  //   const songFavorite = favoritas.some((element) => element.trackId === song.trackId);
  //   console.log(favoritas);
  //   console.log(songFavorite);
  //   this.setState({
  //     loading: false,
  //     // isChecked: songFavorite,
  //   });
  // }

  render() {
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                name="musicas"
                checked={ this.isFavorite(trackId) }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.musicaFavorita }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string,
  trackName: propTypes.string,
  loaging: propTypes.bool,
}.isRequired;

export default MusicCard;
