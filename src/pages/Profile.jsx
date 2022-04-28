import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: [],
      carregando: false,
    };
  }

  async componentDidMount() {
    this.setState({
      carregando: true,
    });
    const api = await getUser();
    this.setState({
      usuario: api,
      carregando: false,
    });
  }

  render() {
    const { usuario, carregando } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {
            carregando === true && <Loading />
          }
          {
            carregando === false && (
              <div>
                <p>
                  {usuario.name}
                </p>
                <p>
                  {usuario.email}
                </p>
                <img
                  data-testid="profile-image"
                  alt={ usuario.name }
                  src={ usuario.image }
                />
                <p>
                  {usuario.description}
                </p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )
          }
        </div>
      </>

    );
  }
}

export default Profile;
