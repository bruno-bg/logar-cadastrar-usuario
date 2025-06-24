import { MESSAGES } from './constants.js';

export class Validation {
  static rules = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    name: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/
  };

  static isValidEmail(email) {
    return email && this.rules.email.test(email.trim());
  }

  static isValidPassword(password) {
    return password && this.rules.password.test(password);
  }

  static isValidName(name) {
    return name && this.rules.name.test(name.trim());
  }

  static passwordsMatch(password, confirmPassword) {
    return password && confirmPassword && password === confirmPassword;
  }
}

export class FormValidator {
  constructor(form, validations) {
    this.form = form;
    this.validations = validations;
    this.errors = new Map();
  }

  validate() {
    this.errors.clear();
    this.validations.forEach(validation => {
      const { field, rule, message, required = true } = validation;
      const value = field.value.trim();
      
      if (required && !value) {
        this.errors.set(field, 'Este campo é obrigatório');
      } else if (value && !rule(value)) {
        this.errors.set(field, message);
      }
    });
    return this.errors.size === 0;
  }

  showErrors() {
    this.errors.forEach((message, field) => {
      this.showError(field, message);
    });
  }

  showError(element, message) {
    const inputField = element.parentElement;
    this.removeError(element);
    
    inputField.classList.add('error');
    
    const errorDisplay = document.createElement('div');
    errorDisplay.classList.add('error-message');
    errorDisplay.innerText = message;
    inputField.insertAdjacentElement('afterend', errorDisplay);
  }

  removeError(element) {
    const inputField = element.parentElement;
    inputField.classList.remove('error');
    
    const errorDisplay = inputField.nextElementSibling;
    if (errorDisplay?.classList.contains('error-message')) {
      errorDisplay.remove();
    }
  }

  static createLoginValidator(form) {
    return new FormValidator(form, [
      {
        field: form.querySelector('#usuarioLogin'),
        rule: value => Validation.isValidEmail(value),
        message: MESSAGES.errors.invalidEmail,
        required: true
      },
      {
        field: form.querySelector('#senhaLogin'),
        rule: value => value.length >= 8,
        message: MESSAGES.errors.invalidPassword,
        required: true
      }
    ]);
  }

  static createRegisterValidator(form) {
    return new FormValidator(form, [
      {
        field: form.querySelector('#usuarioCadastro'),
        rule: value => Validation.isValidName(value),
        message: MESSAGES.errors.invalidName,
        required: true
      },
      {
        field: form.querySelector('#emailCadastro'),
        rule: value => Validation.isValidEmail(value),
        message: MESSAGES.errors.invalidEmail,
        required: true
      },
      {
        field: form.querySelector('#senhaCadastro'),
        rule: value => Validation.isValidPassword(value),
        message: MESSAGES.errors.invalidPassword,
        required: true
      },
      {
        field: form.querySelector('#confirmarSenha'),
        rule: value => value === form.querySelector('#senhaCadastro').value,
        message: MESSAGES.errors.passwordMismatch,
        required: true
      }
    ]);
  }
}  