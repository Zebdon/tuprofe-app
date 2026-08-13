import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zebdon.tuprofeencasa',
  appName: 'Tu Profe en Casa',
  webDir: 'dist',
  server: {
    // androidScheme "https" evita problemas de contenido mixto (mixed content)
    // al llamar a VITE_API_URL, que es https, desde el WebView.
    androidScheme: 'https',
  },
};

export default config;
