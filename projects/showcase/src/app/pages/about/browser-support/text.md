The goal of the project is to be compatible with almost every popular browser that's up-to-date. In other words, I frequently run tests on Chrome, Firefox, and Safari on an iPad, and I update all of them pretty soon.

There's also a limited support for older browsers:

- By default, the library ships binaries compiled to a pretty contemporary JavaScript version. The precise EcmaScript version varies over time,
  but sometimes even the ESR versions of Firefox are too old to run this code.
- As a fallback, the library can also run ES2015 code. Most of the time, this suffices to run the PDF viewer on iOS and Android devices
  that haven't been updated during the last one or two years.
- Internet Explorer is not supported. If you need an IE11 version, you can try ngx-extended-pdf-viewer 7.3.2,
  but without any support from my side.

When the library initializes, it runs a few checks:

- Does the browser support private fields and methods using the `#` prefix?
- Does it support optional chaining?
- Does ot support logical assignment operators?

If any of these checks fails, the library uses the slow and huge ES2015 build.

In case of an emergency, you can force ngx-extended-pdf-viewer to use the ES2015 build by setting the attribute `[forceUsingLegacyES5]="true"`.
