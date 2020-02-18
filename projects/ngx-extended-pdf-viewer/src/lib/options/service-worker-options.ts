export const ServiceWorkerOptions = {
  showUnverifiedSignatures: false
};

if (typeof window !== 'undefined') {
  (window as any).ServiceWorkerOptions = ServiceWorkerOptions;
}
