import { UI } from './ui.js';
import { Auth } from './auth.js';
import { FormValidator, Validation } from './validation.js';
import { MESSAGES } from './constants.js';

class App {
  static init() {
    UI.init();
    Auth.init();
    this.setupFormValidations();
    this.setupPasswordRecovery();
    this.setupTermsAndConditions();
  }

  static setupFormValidations() {
    // Login form validação
    const loginValidator = FormValidator.createLoginValidator(UI.elements.forms.login);
    UI.elements.forms.login.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (loginValidator.validate()) {
        await UI.showSuccessMessage(MESSAGES.success.login);
        UI.resetForms();
      } else {
        loginValidator.showErrors();
      }
    });

    // Register form validação
    const registerValidator = FormValidator.createRegisterValidator(UI.elements.forms.register);
    UI.elements.forms.register.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Primeiro, validar todos os campos
      const isFormValid = registerValidator.validate();
      registerValidator.showErrors();

      // Validar termos e condições
      if (!UI.elements.terms.checkbox.checked) {
        // Remover mensagem de erro anterior dos termos
        const existingTermsError = UI.elements.terms.checkbox.parentElement.querySelector('.checkbox-error');
        if (existingTermsError) {
          existingTermsError.remove();
        }
        
        // Adicionar ícone de erro
        const errorIcon = document.createElement('span');
        errorIcon.className = 'checkbox-error';
        errorIcon.innerHTML = '<i class="fas fa-exclamation-circle" title="Você precisa aceitar os termos e condições"></i>';
        UI.elements.terms.checkbox.parentElement.appendChild(errorIcon);
        UI.elements.terms.checkbox.classList.add('error');
        isFormValid = false;
      } else {
        UI.elements.terms.checkbox.classList.remove('error');
        const termsError = UI.elements.terms.checkbox.parentElement.querySelector('.checkbox-error');
        if (termsError) {
          termsError.remove();
        }
      }

      // Se tudo estiver válido, prosseguir
      if (isFormValid) {
        await UI.showSuccessMessage(MESSAGES.success.register);
        UI.resetForms();
      }
    });

    // Validação em tempo real
    this.setupRealTimeValidation();
  }

  static setupRealTimeValidation() {
    const registerValidator = FormValidator.createRegisterValidator(UI.elements.forms.register);

    UI.elements.inputs.registerUser.addEventListener('blur', function() {
      if (!this.value.trim()) {
        registerValidator.showError(this, 'Este campo é obrigatório');
      } else if (!Validation.isValidName(this.value)) {
        registerValidator.showError(this, MESSAGES.errors.invalidName);
      } else {
        registerValidator.removeError(this);
      }
    });

    UI.elements.inputs.registerEmail.addEventListener('blur', function() {
      if (!this.value.trim()) {
        registerValidator.showError(this, 'Este campo é obrigatório');
      } else if (!Validation.isValidEmail(this.value)) {
        registerValidator.showError(this, MESSAGES.errors.invalidEmail);
      } else {
        registerValidator.removeError(this);
      }
    });

    UI.elements.inputs.registerPassword.addEventListener('blur', function() {
      if (!this.value.trim()) {
        registerValidator.showError(this, 'Este campo é obrigatório');
      } else if (!Validation.isValidPassword(this.value)) {
        registerValidator.showError(this, MESSAGES.errors.invalidPassword);
        App.showPasswordRules();
      } else {
        registerValidator.removeError(this);
      }
    });

    UI.elements.inputs.confirmPassword.addEventListener('blur', function() {
      if (!this.value.trim()) {
        registerValidator.showError(this, 'Este campo é obrigatório');
      } else if (this.value !== UI.elements.inputs.registerPassword.value) {
        registerValidator.showError(this, MESSAGES.errors.passwordMismatch);
      } else {
        registerValidator.removeError(this);
      }
    });
  }

  static setupPasswordRecovery() {
    UI.elements.passwordRecovery.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const { value: email } = await Swal.fire({
        title: 'Recuperação de Senha',
        html: `
          <p style="margin-bottom: 20px;">Digite seu email para receber as instruções de recuperação de senha.</p>
          <input type="email" id="emailRecuperacao" class="swal2-input" placeholder="Digite seu email">
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4481eb',
        cancelButtonColor: '#ff3860',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const email = document.getElementById('emailRecuperacao').value;
          if (!Validation.isValidEmail(email)) {
            Swal.showValidationMessage(MESSAGES.errors.invalidEmail);
            return false;
          }
          return email;
        }
      });

      if (email) {
        await Auth.handlePasswordRecovery(email);
      }
    });
  }

  static setupTermsAndConditions() {
    UI.elements.terms.link.addEventListener('click', (e) => {
      e.preventDefault();
      this.showTermsAndConditions();
    });
  }

  static async showPasswordRules() {
    await Swal.fire({
      title: 'Regras para criação de senha',
      html: `
        <div style="text-align: left">
          A senha deve conter:
          <ul style="list-style-type: disc; margin-left: 20px;">
            <li>No mínimo 8 caracteres</li>
            <li>Pelo menos uma letra maiúscula</li>
            <li>Pelo menos uma letra minúscula</li>
            <li>Pelo menos um número</li>
            <li>Pelo menos um caractere especial (@$!%*?&)</li>
          </ul>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#4481eb'
    });
  }

  static async showTermsAndConditions() {
    const result = await Swal.fire({
      title: 'Termos e Condições',
      html: `
        <div style="text-align: left; max-height: 60vh; overflow-y: auto; padding: 0 10px;">
          <h3>1. Aceitação dos Termos</h3>
          <p>Ao acessar e usar este sistema, você concorda com estes termos e condições.</p>
          
          <h3>2. Privacidade e Proteção de Dados</h3>
          <p>Nos comprometemos a proteger suas informações pessoais de acordo com nossa política de privacidade.</p>
          
          <h3>3. Uso do Sistema</h3>
          <p>O usuário se compromete a:</p>
          <ul>
            <li>Fornecer informações verdadeiras e precisas</li>
            <li>Manter suas credenciais de acesso em segurança</li>
            <li>Não compartilhar sua conta com terceiros</li>
            <li>Usar o sistema de forma ética e legal</li>
          </ul>
          
          <h3>4. Responsabilidades</h3>
          <p>O usuário é responsável por:</p>
          <ul>
            <li>Todas as atividades realizadas em sua conta</li>
            <li>Manter seus dados atualizados</li>
            <li>Reportar qualquer uso não autorizado</li>
          </ul>
          
          <h3>5. Segurança</h3>
          <p>Recomendamos:</p>
          <ul>
            <li>Usar senhas fortes e únicas</li>
            <li>Não compartilhar informações de login</li>
            <li>Fazer logout após usar o sistema</li>
          </ul>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Aceitar',
      confirmButtonColor: '#4481eb',
      width: '600px'
    });

    if (result.isConfirmed) {
      UI.elements.terms.checkbox.checked = true;
      UI.elements.terms.checkbox.classList.remove('error');
      const errorDisplay = UI.elements.terms.checkbox.parentElement.querySelector('.checkbox-error');
      if (errorDisplay) {
        errorDisplay.remove();
      }
    }
  }
}

// Inicializa a aplicação
App.init();
