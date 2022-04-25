import React from 'react';
import { getUser } from './services/userAPI';
import Loading from './pages/Loading';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const nomeDeApi = await getUser();
    this.setState({
      nome: nomeDeApi.name,
      loading: false,
    });
  }

  render() {
    const { nome, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (
          <p data-testid="header-user-name">{ nome }</p>
        )}
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">profile</Link>
      </header>
    );
  }
}

export default Header;
