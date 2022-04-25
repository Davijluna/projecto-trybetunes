import React from 'react';
import Header from '../Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeArts: '',
    };
  }

  funcLength = (e) => {
    console.log(e.target.value);
    this.setState({
      nomeArts: e.target.value,
    });
  }

  render() {
    const numberArts = 2;
    const { nomeArts } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
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
              // onClick={}
            >
              Pesquisar

            </button>
          </form>
        </div>
      </>

    );
  }
}

export default Search;
