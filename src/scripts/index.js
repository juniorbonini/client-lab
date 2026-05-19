const API_URL =
  "https://crudcrud.com/api/abbe1a4da8304f5db77b73245d0e45a7/clients";

let requestQueue = [];
let isProcessing = false;

// Funções auxiliares DOM
const getElement = (id) => document.getElementById(id);
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
