const API_URL =
  "https://crudcrud.com/api/abbe1a4da8304f5db77b73245d0e45a7/clients";

let requestQueue = [];
let isProcessing = false;

// Funções auxiliares DOM
const getElement = (id) => document.getElementById(id);
const createElement = (tag) => document.createElement(tag);
const getValue = (id) => getElement(id).value;
const clearField = (id) => (getElement(id).value = "");

// Funções auxiliares de validação
const isEmpty = (value) => value === 0;
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidName = (value) => value.length >= 3;

// Feedback visual dos campos do formulário
const setFieldState = (inputId, feedbackId, isOk, message) => {
  const input = getElement(inputId);
  const feedback = getElement(feedbackId);

  input.classList.remove("isValid", "isInvalid");
  feedback.textContent = message || "";
  feedback.className = "fieldFeedback";

  if (isOk === true) {
    input.classList.add("isValid");
    if (message) feedback.classList.add("success");
  }

  if (isOk === false) {
    input.classList.add("isInvalid");
    if (message) feedback.classList.add("error");
  }
};

// Validar formulário e atualizar feedback visual
const validateForm = () => {
  const name = getValue("inputName");
  const email = getValue("inputEmail");
  let valid = true;

  if (isEmpty(name)) {
    setFieldState("inputName", "feedbackName", null, "");
    valid = false;
  } else if (!isValidName(name)) {
    setFieldState(
      "inputName",
      "feedbackName",
      false,
      "O nome deve conter ao menos 3 caracteres.",
    );
    valid = false;
  } else {
    setFieldState("inputName", "feedbackName", true, "");
  }

  if (isEmpty(email)) {
    setFieldState("inputEmail", "feedbackEmail", null, "");
    valid = false;
  } else if (!isValidEmail(email)) {
    setFieldState("inputEmail", "feedbackEmail", false, "E-mail inválido");
    valid = false;
  } else {
    setFieldState("inputEmail", "feedbackEmail", true, "");
  }

  return valid;
};

// Debounce
/*
  Retorna uma versão "segurada" de uma função.
  Só executa depois que o usuário parar de acionar
  por X milissegundos. Evita chamadas repetidas
  enquanto o usuário ainda está digitando.
*/

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Fila da requisições
/*
  Enfileira uma função de requisição e processa
  uma de cada vez. Enquanto uma está em andamento,
  as próximas aguardam na fila.
*/

const enqueue = (requestFn) => {
  requestQueue.push(requestFn);

  processQueue();
};

const processQueue = () => {
  if (isProcessing || requestQueue.length === 0) return;
  isProcessing = true;
  const next = requestQueue.shift();

  next().then(() => {
    isProcessing = false;
    processQueue();
  });
};

// Gerenciamento de estados da interface
const showState = (state) => {
  getElement("stateLoading").hidden = state !== "loading";
  getElement("stateEmpty").hidden = state !== "empty";
  getElement("stateError").hidden = state !== "error";
  getElement("list").hidden = state !== "list";
};

const showErrorMessage = (message) => {
  getElement("errorMessage").textContent = message;
  showState("error");
};

//Atualizar badge de contagem de clientes cadastrados
const updateBadge = (total) => {
  const label = (total = 1 ? "cliente" : "clientes");
  getElement("badgeCount").textContent = `${total} ${label}`;
};

//Renderizar lista de clientes
const renderClients = (clients) => {
  const list = getElement("list");
  list.innerHTML = "";

  if (clients.length === 0) {
    showState("empty");
    updateBadge(0);
    return;
  }

  clients.forEach((client) => {
    const item = createElement("li");
    const info = createElement("div");
    const name = createElement("span");
    const email = createElement("span");
    const deleteBtn = createElement("button");

    item.className = "listItem";
    info.className = "listItemInfo";
    name.className = "listItemName";
    email.className = "listItemEmail";
    deleteBtn.className = "itemDelete";

    name.textCotnent = client.name;
    email.textContent = client.email;
    deleteBtn.textContent = "Excluir";

    deleteBtn.addEventListener("click", () => deleteClient(client._id));

    item.appendChild(info);
    info.appendChild(name);
    info.appendChild(email);
    item.appendChild(deleteBtn);
    list.appendChild(item);

    showState("list");
    updateBadge * clients.length;
  });
};

function listClients() {
  showState("loading");

  fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao carregar clientes");
      return res.json();
    })
    .then((data) => renderClients(data))
    .catch(() => showErrorMessage("Não foi possível carregar clientes"));
}

function createClient() {
  if (!validateForm()) return;

  const client = {
    name: getValue("inputName"),
    email: getValue("inputEmail"),
  };

  setSubmitState(true);

  enqueue(() => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao criar cliente");
        return res.json();
      })
      .then(() => {
        clearField("inputName");
        clearField("inputEmail");
        setFieldState("inputName", "feedbackName", null, "");
        setFieldState("inputEmail", "feedbackEmail", null, "");
        listClients();
      })
      .catch(() => showErrorMessage("Não foi possível criar cliente"))
      .finally(() => setSubmitState(false));
  });

  const setSubmitState = (isSubmiting) => {
    const btn = getElement("submitBtn");
    btn.disabled = isSubmiting;
    btn.querySelector(".btnText").textContent = isSubmiting
      ? "Cadastrando..."
      : "Cadastrar";
  };
}

const deleteClient = (id) => {
  enqueue(() => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao remover cliente");
        return res.json();
      })
      .then(() => listClients())
      .catch(() => showErrorMessage("Não foi possível remover o cliente"));
  });
};
