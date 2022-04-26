import propTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { song } = this.props;
    const { trackName, previewUrl } = song;
    return (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string,
  trackName: propTypes.string,
}.isRequired;

export default MusicCard;
