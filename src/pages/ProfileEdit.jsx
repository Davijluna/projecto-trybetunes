import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      descricao: '',
      imagem: '',
      carregando: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.recebeDados = this.recebeDados.bind(this);
  }

  async componentDidMount() {
    this.recebeDados();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  abilitaBotao = () => {
    const { nome, email, descricao, imagem } = this.state;
    if (
      nome.length === 0
      || email.length === 0
      || descricao.length === 0
      || imagem.length === 0
    ) {
      return true;
    }
    return false;
  }

  atualizaDados = async () => {
    const { nome, email, imagem, descricao } = this.state;
    this.setState({
      carregando: true,
    });
    await updateUser({

      name: nome,
      email,
      description: descricao,
      image: imagem,
    });
    this.setState({
      carregando: false,

    });
    const { history } = this.props;
    history.push('/profile');
  }

  async recebeDados() {
    this.setState({
      carregando: true,
    });
    const infoUsuario = await getUser();
    this.setState({
      nome: infoUsuario.name,
      email: infoUsuario.email,
      descricao: infoUsuario.description,
      imagem: infoUsuario.image,
      carregando: false,
    });
  }

  render() {
    const { carregando, nome, email, descricao, imagem } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {carregando === true && <Loading />}
          {carregando === false && (
            <form>
              <label htmlFor="label01">
                Nome:
                <input
                  id="label01"
                  data-testid="edit-input-name"
                  type="text"
                  name="nome"
                  value={ nome }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="label02">
                email:
                <input
                  id="label02"
                  data-testid="edit-input-email"
                  type="text"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="label03">
                descrição
                <input
                  id="label03"
                  data-testid="edit-input-description"
                  type="text"
                  name="descricao"
                  value={ descricao }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="label04">
                imagem
                <input
                  id="label04"
                  data-testid="edit-input-image"
                  type="text"
                  name="imagem"
                  value={ imagem }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="edit-button-save"
                disabled={ this.abilitaBotao() }
                type="button"
                onClick={ this.atualizaDados }
              >
                Salvar
              </button>
            </form>
          )}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string.isRequired,
};

export default ProfileEdit;
