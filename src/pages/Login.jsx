import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      loading: false,
    };
  }

  // requisito 02
  funcnova = (e) => {
    // console.log('oi');
    this.setState({
      nome: e.target.value,
    });
  }

  // Tive Ajuda de Rafael
  // função que guarda os nomes exibindo carregando.
  funcClick = () => {
    const { history } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const { nome } = this.state;
      await createUser({ name: nome });
      history.push('/search');
    });
  }

  render() {
    const numberMax = 3;
    const { nome, loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : (
            <form>
              <label htmlFor="name">
                nome:
                <input
                  data-testid="login-name-input"
                  name="inputNome"
                  value={ nome }
                  onChange={ this.funcnova }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                onClick={ this.funcClick } // no click aciona a função que guarda os nomes.
                disabled={ nome.length < numberMax } // logica para abilitar e desabilitar botão.
              >
                Entrar
              </button>
            </form>
          )
        }

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
