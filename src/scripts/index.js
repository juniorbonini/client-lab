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

