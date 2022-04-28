import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      listaMusic: [],
    };
  }

  componentDidMount() {
    this.recebeRequisicao();
  }

  async recebeRequisicao() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const listaMusic = await getMusics(id);
    this.setState({
      listaMusic,
    });
  }

  render() {
    const { listaMusic } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <div>
          <p data-testid="artist-name">{ listaMusic[0]?.artistName }</p>
          <p data-testid="album-name">{ listaMusic[0]?.collectionName}</p>
        </div>
        { listaMusic.filter((element) => (element.kind === 'song'))
          .map((element, index) => (
            <MusicCard
              key={ index }
              song={ element }
            />
          )) }
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default Album;
