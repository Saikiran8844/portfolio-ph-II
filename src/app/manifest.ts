import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saikiran Nannapaneni — Software Engineer & Creative Technologist',
    short_name: 'Saikiran N.',
    description: 'Personal portfolio of Saikiran Nannapaneni. Software Engineer crafting distributed microservices, Generative AI tooling, and interactive web experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07080a',
    theme_color: '#c93a2a',
    icons: [
      {
        src: '/md-red-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
