const optionalChaining = {
  support: true,
};

let x = false;
x ||= true;
window.supportsOptionalChaining = optionalChaining?.support;
