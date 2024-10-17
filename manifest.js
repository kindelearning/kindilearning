// app/manifest.js
export default function manifest() {
    return {
      name: 'Kindi Learning',
      short_name: 'Kindi Learning',
      description: 'A Progressive Web App built with Next.js',
      start_url: 'https://kindilearning.vercel.app/',
      display: 'standalone',
      background_color: '#eaeaf5',
      theme_color: '#000000',
      icons: [
        { src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    };
  }
  