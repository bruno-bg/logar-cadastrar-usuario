import { UI } from './ui.js';
import { MESSAGES } from './constants.js';

export class Auth {
  static config = {
    google: {
      client_id: 'SEU_GOOGLE_CLIENT_ID',
    },
    facebook: {
      appId: 'SEU_FACEBOOK_APP_ID',
      cookie: true,
      xfbml: true,
      version: 'v18.0'
    }
  };

  static init() {
    this.initFacebook();
    this.setupEventListeners();
  }

  static initFacebook() {
    window.fbAsyncInit = () => FB.init(this.config.facebook);
  }

  static setupEventListeners() {
    UI.elements.buttons.googleLogin.addEventListener('click', () => this.handleGoogleLogin());
    UI.elements.buttons.facebookLogin.addEventListener('click', () => this.handleFacebookLogin());
  }

  static async handleGoogleLogin() {
    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: this.config.google.client_id,
        scope: 'email profile',
        callback: this.handleGoogleResponse.bind(this)
      });
      client.requestAccessToken();
    } catch (error) {
      console.error('Erro no login com Google:', error);
      UI.showErrorMessage('Erro ao realizar login com Google');
    }
  }

  static async handleGoogleResponse(response) {
    if (response.access_token) {
      try {
        const userInfo = await this.fetchGoogleUserInfo(response.access_token);
        this.handleSocialLoginSuccess({
          nome: userInfo.name,
          email: userInfo.email,
          foto: userInfo.picture,
          provedor: 'Google'
        });
      } catch (error) {
        console.error('Erro ao obter dados do usuário Google:', error);
        UI.showErrorMessage('Erro ao obter dados do usuário');
      }
    }
  }

  static async fetchGoogleUserInfo(accessToken) {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.json();
  }

  static handleFacebookLogin() {
    FB.login(
      response => this.handleFacebookResponse(response),
      { scope: 'public_profile,email' }
    );
  }

  static handleFacebookResponse(response) {
    if (response.authResponse) {
      FB.api('/me', { fields: 'name, email, picture' }, userData => {
        this.handleSocialLoginSuccess({
          nome: userData.name,
          email: userData.email,
          foto: userData.picture?.data?.url,
          provedor: 'Facebook'
        });
      });
    } else {
      console.error('Usuário cancelou o login ou não autorizou totalmente.');
      UI.showErrorMessage('Login com Facebook cancelado');
    }
  }

  static async handleSocialLoginSuccess(userData) {
    try {
      // Aqui você implementaria a lógica de autenticação com seu backend
      console.log('Dados do usuário:', userData);
      
      await UI.showSuccessMessage(
        `Bem-vindo, ${userData.nome}!\nLogin realizado via ${userData.provedor}`
      );
      
      // Redirecionar ou executar outras ações após o login
    } catch (error) {
      console.error('Erro ao processar login:', error);
      UI.showErrorMessage('Erro ao processar login');
    }
  }

  static async handlePasswordRecovery(email) {
    try {
      // Aqui você implementaria a lógica de recuperação de senha
      await UI.showSuccessMessage(MESSAGES.success.passwordRecovery);
    } catch (error) {
      console.error('Erro na recuperação de senha:', error);
      UI.showErrorMessage('Erro ao processar recuperação de senha');
    }
  }
} 