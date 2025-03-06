import { CLASSES, SELECTORS } from './constants.js';

export class UI {
  static elements = {
    container: document.querySelector(SELECTORS.container),
    forms: {
      login: document.querySelector(SELECTORS.forms.login),
      register: document.querySelector(SELECTORS.forms.register)
    },
    inputs: {
      loginUser: document.querySelector(SELECTORS.inputs.loginUser),
      loginPassword: document.querySelector(SELECTORS.inputs.loginPassword),
      registerUser: document.querySelector(SELECTORS.inputs.registerUser),
      registerEmail: document.querySelector(SELECTORS.inputs.registerEmail),
      registerPassword: document.querySelector(SELECTORS.inputs.registerPassword),
      confirmPassword: document.querySelector(SELECTORS.inputs.confirmPassword)
    },
    buttons: {
      signIn: document.querySelector(SELECTORS.buttons.signIn),
      signUp: document.querySelector(SELECTORS.buttons.signUp),
      googleLogin: document.querySelector(SELECTORS.buttons.googleLogin),
      facebookLogin: document.querySelector(SELECTORS.buttons.facebookLogin)
    },
    terms: {
      checkbox: document.querySelector(SELECTORS.terms.checkbox),
      link: document.querySelector(SELECTORS.terms.link)
    },
    passwordRecovery: document.querySelector(SELECTORS.passwordRecovery),
    togglePassword: document.querySelectorAll(SELECTORS.togglePassword)
  };

  static init() {
    this.setupEventListeners();
  }

  static setupEventListeners() {
    // Form switch events
    this.elements.buttons.signUp.addEventListener('click', () => this.switchForm('register'));
    this.elements.buttons.signIn.addEventListener('click', () => this.switchForm('login'));

    // Password toggle events
    this.elements.togglePassword.forEach(toggle => {
      toggle.addEventListener('click', this.handlePasswordToggle);
    });
  }

  static switchForm(mode) {
    this.elements.container.classList.toggle(CLASSES.signUpMode, mode === 'register');
    this.resetForms();
  }

  static resetForms() {
    this.elements.forms.login.reset();
    this.elements.forms.register.reset();
    this.clearErrors();
    
    // Limpar erros e estado do checkbox dos termos
    this.elements.terms.checkbox.classList.remove('error');
    const termsError = this.elements.terms.checkbox.parentElement.querySelector('.checkbox-error');
    if (termsError) {
      termsError.remove();
    }
  }

  static clearErrors() {
    document.querySelectorAll(`.${CLASSES.errorMessage}, .${CLASSES.checkboxError}`)
      .forEach(error => error.remove());
    document.querySelectorAll(`.${CLASSES.error}`)
      .forEach(field => field.classList.remove(CLASSES.error));
  }

  static handlePasswordToggle(event) {
    const input = event.target.previousElementSibling;
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    event.target.classList.toggle('fa-eye');
    event.target.classList.toggle('fa-eye-slash');
  }

  static showSuccessMessage(message) {
    return Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: message,
      confirmButtonColor: '#4481eb'
    });
  }

  static showErrorMessage(message) {
    return Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: message,
      confirmButtonColor: '#4481eb'
    });
  }
} 