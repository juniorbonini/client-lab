# ClientLab

Aplicação CRUD de clientes desenvolvida com foco em fundamentos de HTTP, manipulação de DOM e organização de código JavaScript.

O projeto consome uma API REST temporária do CrudCrud para realizar operações de cadastro, listagem e remoção de clientes, simulando o fluxo real de comunicação entre frontend e servidor.

---

# Preview

ClientLab utiliza uma interface moderna baseada em:

- Roxo profundo
- Dourado suave
- Glassmorphism leve
- Tipografia serifada + monospace
- Feedback visual dinâmico
- Estados de carregamento e erro

---

# Funcionalidades

- Cadastro de clientes
- Listagem dinâmica de clientes
- Exclusão de clientes
- Atualização manual da lista
- Validação visual em tempo real
- Controle de estados da interface
- Debounce para validações
- Fila de requisições HTTP
- Feedback de loading, vazio e erro

---

# Tecnologias utilizadas

- HTML5 Semântico
- CSS3
- JavaScript Vanilla
- Fetch API
- CrudCrud API

---

# Estrutura do projeto

```txt
src/
├── public/
│   └── index.html
├── scripts/
│   └── index.js
└── styles/
    └── style.css
```

---

# HTML Semântico

A estrutura da interface foi construída utilizando tags semânticas para melhorar:

- acessibilidade
- organização
- legibilidade
- manutenção

Principais elementos utilizados:

```html
<header>
<main>
<section>
<footer>
<form>
<label>
```

---

# Sistema visual

O projeto utiliza CSS organizado com:

- Design Tokens
- Variáveis globais
- Escala de espaçamento
- Escala tipográfica
- Sistema de cores
- Sistema de sombras
- Sistema de transições

---

# Paleta de cores

## Roxo profundo

```css
--clr-purple: #9b6dff;
```

Responsável pela identidade principal da aplicação.

---

## Dourado suave

```css
--clr-gold: #e8c56a;
```

Responsável pelos destaques visuais e contraste elegante.

---

# Organização do JavaScript

O arquivo `index.js` foi estruturado separando responsabilidades em blocos claros:

---

## Helpers DOM

Funções reutilizáveis para manipulação da interface:

```js
const getElement = (id) => document.getElementById(id);
```

---

## Helpers de validação

Responsáveis pela integridade dos dados:

```js
const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
```

---

## Controle visual

Responsável pelos estados:

- loading
- empty
- error
- success

---

## Renderização dinâmica

Responsável por criar e atualizar os elementos da lista de clientes dinamicamente utilizando:

```js
document.createElement()
```

---

# Conceitos aplicados

## Debounce

A aplicação utiliza debounce para evitar múltiplas execuções consecutivas enquanto o usuário digita.

### Problema sem debounce

Sem debounce:

- cada tecla dispara validação
- múltiplas execuções acontecem desnecessariamente
- maior processamento

Exemplo:

Digitar:

```txt
João Silva
```

poderia disparar mais de 10 validações consecutivas.

---

## Solução aplicada

O debounce aguarda alguns milissegundos após o usuário parar de digitar antes de executar a validação.

```js
const debounce = (fn, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
```

---

## Impacto prático

- Menos processamento
- Melhor experiência
- Menos re-renderizações
- Código mais performático

---

# Fila de Requisições HTTP

A aplicação implementa uma fila para garantir que as requisições ocorram em ordem.

---

## Problema sem fila

Imagine:

1. Usuário cria um cliente
2. Rapidamente remove outro
3. Ambas requisições acontecem simultaneamente

Isso pode causar:

- race conditions
- estado inconsistente
- lista desatualizada
- renderização incorreta

---

## Solução aplicada

As operações entram em uma fila e são processadas uma de cada vez.

Fluxo:

```txt
POST → finaliza
DELETE → inicia
GET → atualiza lista
```

---

## Implementação

```js
const enqueue = (requestFn) => {
  requestQueue.push(requestFn);

  processQueue();
};
```

---

## Impacto prático

- Ordem garantida
- Estado consistente
- Menos bugs assíncronos
- Fluxo previsível

---

# Estados da interface

A aplicação possui estados separados para:

## Loading

Exibido durante carregamento da API.

---

## Empty

Exibido quando não existem clientes cadastrados.

---

## Error

Exibido quando ocorre erro de comunicação com a API.

---

## List

Exibido quando clientes são carregados com sucesso.

---

# Integração HTTP

A aplicação utiliza:

- GET
- POST
- DELETE

Todos realizados utilizando:

```js
fetch()
```

com:
- `.then()`
- tratamento de erros
- atualização automática da interface

---

# Como executar o projeto

## 1. Clone o repositório

```bash
git clone SEU_REPOSITORIO
```

---

## 2. Acesse o projeto

```bash
cd clientlab
```

---

## 3. Gere um endpoint no CrudCrud

Acesse:

https://crudcrud.com

Copie o endpoint gerado.

---

## 4. Atualize a URL da API

No arquivo:

```txt
src/scripts/index.js
```

Substitua:

```js
const API_URL =
  "https://crudcrud.com/api/SEU_TOKEN/clients";
```

---

## 5. Execute o projeto

Utilize:
- Live Server
- VSCode
- navegador

Abrindo:

```txt
src/public/index.html
```

---

# Aprendizados praticados

Durante o desenvolvimento foram trabalhados conceitos importantes como:

- HTTP
- REST API
- Assincronismo
- Manipulação de DOM
- Organização de código
- Validação de formulários
- Controle de estado
- Renderização dinâmica
- Estruturação frontend
- Separação de responsabilidades
- UX visual
- Tratamento de erros

---

# Observações

O CrudCrud fornece endpoints temporários.

No plano gratuito:
- existe limite de requisições
- o endpoint expira após um período

Caso expire:
- gere um novo endpoint
- atualize a constante `API_URL`

---

# Autor

Luiz Augusto

Projeto desenvolvido com foco em aprendizado prático de HTTP, JavaScript e arquitetura frontend.
