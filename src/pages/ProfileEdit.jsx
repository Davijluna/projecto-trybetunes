import React from 'react';
import Header from '../Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     usuario: [],
  //     carregando: false,
  //   };
  // }

  dadosUsuario() {
    const infoUsuario = getUser();
    console.log(infoUsuario);
  }

  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" />
      </>

    );
  }
}

export default ProfileEdit;
