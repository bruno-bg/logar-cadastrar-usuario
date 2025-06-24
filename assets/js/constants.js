export const MESSAGES = {
  errors: {
    invalidEmail: 'Por favor, insira um email válido',
    invalidPassword: 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, letras minúsculas, números e um caractere especial',
    passwordMismatch: 'As senhas não coincidem',
    termsNotAccepted: 'Você deve aceitar os termos e condições',
    invalidName: 'Por favor, insira um nome válido sem números ou caracteres especiais'
  },
  success: {
    login: 'Login realizado com sucesso!',
    register: 'Cadastro realizado com sucesso!',
    passwordRecovery: 'Email de recuperação enviado com sucesso!'
  }
};

export const CLASSES = {
  error: 'error',
  errorMessage: 'error-message',
  checkboxError: 'checkbox-error',
  success: 'success',
  signUpMode: 'sign-up-mode'
};

export const SELECTORS = {
  container: '.container',
  forms: {
    login: '#login',
    register: '#cadastro'
  },
  inputs: {
    loginUser: '#usuarioLogin',
    loginPassword: '#senhaLogin',
    registerUser: '#usuarioCadastro',
    registerEmail: '#emailCadastro',
    registerPassword: '#senhaCadastro',
    confirmPassword: '#confirmarSenha'
  },
  buttons: {
    signIn: '#sign-in-btn',
    signUp: '#sign-up-btn',
    googleLogin: '#googleLogin',
    facebookLogin: '#facebookLogin'
  },
  terms: {
    checkbox: '#aceitarTermos',
    link: '#termsLink'
  },
  passwordRecovery: '#recuperarSenha',
  togglePassword: '.toggle-password'
};  