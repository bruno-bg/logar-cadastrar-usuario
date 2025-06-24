# Sistema de Login e Cadastro

Um sistema moderno e responsivo de autenticação com formulários de login e cadastro, desenvolvido com HTML, CSS e JavaScript puro.

<div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
  <img src="./assets/img/preview1.png" alt="Preview do Sistema" width="49%">
  <img src="./assets/img/preview2.png" alt="Preview do Sistema" width="49%">
</div>

## 🚀 Funcionalidades

### 1. Autenticação

- Login com email e senha
- Cadastro de novos usuários
- Login social (Google e Facebook)
- Recuperação de senha
- Visualização/ocultação de senha

### 2. Validações em Tempo Real

- **Campos de Cadastro:**
  - Nome: apenas letras e espaços
  - Email: formato válido de email
  - Senha: regras de força mínima
  - Confirmação de senha: correspondência
- **Campos de Login:**
  - Email: formato válido
  - Senha: preenchimento obrigatório

### 3. Regras de Senha

A senha deve conter:

- Mínimo de 8 caracteres
- Pelo menos uma letra maiúscula
- Pelo menos uma letra minúscula
- Pelo menos um número
- Pelo menos um caractere especial (@$!%\*?&)

### 4. Interface Responsiva

- Design adaptável para diferentes tamanhos de tela
- Animações suaves de transição
- Feedback visual para interações do usuário
- Mensagens de erro claras e intuitivas

### 5. Termos e Condições

- Aceitação obrigatória para cadastro
- Modal detalhado com termos
- Feedback visual para aceitação

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome (ícones)
- SweetAlert2 (modais)
- APIs de autenticação social (Google e Facebook)

## 🔧 Configuração

1. Clone o repositório
2. Configure as credenciais de autenticação social:
   - Substitua \`SEU_GOOGLE_CLIENT_ID\` em \`auth.js\`
   - Substitua \`SEU_FACEBOOK_APP_ID\` em \`auth.js\`
3. Abra o \`index.html\` em um servidor web local

## 📚 Módulos do Sistema

### 1. UI (ui.js)

- Gerenciamento de elementos da interface
- Manipulação de formulários
- Exibição de mensagens
- Alternância entre formulários

### 2. Autenticação (auth.js)

- Integração com Google e Facebook
- Gerenciamento de login/cadastro
- Recuperação de senha
- Manipulação de tokens

### 3. Validação (validation.js)

- Validação de campos em tempo real
- Regras de validação personalizadas
- Feedback de erros
- Verificação de força de senha

### 4. Constantes (constants.js)

- Mensagens do sistema
- Seletores CSS
- Classes de estilo
- Configurações gerais

### 5. Principal (main.js)

- Inicialização do sistema
- Configuração de eventos
- Gerenciamento de formulários
- Integração entre módulos

## 🎨 Recursos de Interface

1. **Animações**

   - Transição suave entre formulários
   - Feedback visual para interações
   - Efeitos hover em botões
   - Indicadores de carregamento

2. **Responsividade**

   - Layout adaptável
   - Breakpoints para diferentes telas
   - Imagens responsivas
   - Fontes flexíveis

3. **Feedback Visual**
   - Indicadores de erro em tempo real
   - Ícones informativos
   - Tooltips de ajuda
   - Mensagens de sucesso/erro

## 🔒 Segurança

1. **Validações**

   - Sanitização de inputs
   - Validação no cliente
   - Proteção contra XSS
   - Verificação de força de senha

2. **Autenticação**
   - Tokens seguros
   - Proteção contra CSRF
   - Timeout de sessão
   - Criptografia de dados sensíveis

## 📱 Compatibilidade

- Chrome (última versão)
- Firefox (última versão)
- Safari (última versão)
- Edge (última versão)
- Dispositivos móveis e tablets 
