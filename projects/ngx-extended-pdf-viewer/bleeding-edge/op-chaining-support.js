// This file provokes syntax errors if your browser doesn't support
// some new JavaScript standard. This allows ngx-extended-pdf-viewer
// to switch to the slow but reliable legacy builds.
const optionalChaining = {
  support: true,
};

// Does your browser support the logical assignment operators?
let x = false;
x ||= true;


// Does your browser doesn't support private fields?
class ClassWithPrivateField {
  #privateField;
}

window.supportsOptionalChaining = optionalChaining?.support;
