import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      // inputNome: '',
      // botaoDisab: true,
      loading: false,
    };
    // this.pegarDados = this.pegarDados.bind(this); // controlar dados
    // this.isSaveButtonDesabled = this.isSaveButtonDesabled.bind(this);
    // this.createUser = this.createUser.bind(this);
  }

  // requisito 02.e
  funcnova = (e) => {
    // console.log(e.target);
    this.setState({
      nome: e.target.value,
    });
  }

  funcClick = () => {
    const { history } = this.props;
    // console.log(history);
    this.setState({
      loading: true,
    }, async () => {
      const { nome } = this.state;
      await createUser({ name: nome });
      history.push('/search');
    });
  }

  // funcClick = async (event) => {
  //   event.preventDefault();
  //   const { name } = this.state;
  //   this.setState({
  //     loading: true,
  //   });
  //   await createUser({ name });
  //   history.push('/search');
  // };

  // pegarDados({ target }) { // nesta parte foi desestruturado o event.target.
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value, // foi chamada a chave [name] e o valor value
  //     // inputNome: target.value,
  //   }, this.isSaveButtonDesabled(value));
  //   createUser({ name });
  //   this.setState({ loading: true, pegarDados: true });
  // }

  // isSaveButtonDesabled(value) {
  //   // const { inputNome } = this.state;
  //   const MAX_NUMBER = 3;
  //   if (value.length >= MAX_NUMBER) {
  //     this.setState({ botaoDisab: false });
  //   } else {
  //     this.setState({ botaoDisab: true });
  //   }
  // }

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
                onClick={ this.funcClick }
                disabled={ nome.length < numberMax }
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
