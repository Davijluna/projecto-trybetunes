import React from 'react';
import Header from '../Header';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import Loading from './Loading';

class Favorites extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     musicasMarcadas: [],
  //     // carregando: false,
  //   };
  // }

  // async componentDidMount() {
  //   const musicFavorite = getFavoriteSongs();
  // }

  // returnApIFavoritSong = () => {
  //   const { musicasMarcadas } = state;
  //   this.setState({
  //     carregando: true,
  //   });

  // }

  render() {
    const { musicFavorite } = this.state;
    return (
      <>
        <div data-testid="page-favorites">
          <ul>
            <li>{ musicFavorite }</li>
          </ul>
        </div>
        <Header />
      </>
    );
  }
}

export default Favorites;
