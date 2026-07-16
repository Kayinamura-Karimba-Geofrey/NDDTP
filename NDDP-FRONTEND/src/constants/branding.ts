/**
 * Rwanda Defence Force & Ministry of Defence branding references.
 * Official sources:
 * - Ministry of Defence: https://mod.gov.rw
 * - RDF Flickr logos: https://www.flickr.com/photos/rwandadefenceforce/
 */
export const BRANDING = {
  organization: 'Ministry of Defence — Republic of Rwanda',
  shortName: 'MoD Rwanda',
  forceName: 'Rwanda Defence Force',
  platformName: 'National Defence Digital Transformation Platform',
  platformAcronym: 'NDDTP',
  tagline: 'Digitizing administrative excellence for national defence',
  modWebsite: import.meta.env.VITE_MOD_WEBSITE ?? 'https://mod.gov.rw',
  rdfFlickrAlbum: 'https://www.flickr.com/photos/rwandadefenceforce/albums/72177720315005780/',
  logoUrl:
    import.meta.env.VITE_RDF_LOGO_URL ??
    'https://live.staticflickr.com/65535/53547033213_c3792991a4.jpg',
  colors: {
    rwandaBlue: '#000000',
    rwandaYellow: '#525252',
    rwandaGreen: '#000000',
    modNavy: '#000000',
    modGold: '#000000',
  },
  contact: {
    phone: '+250 788 310 178',
    email: 'info@mod.gov.rw',
    address: 'B.P. 23 Kigali — Rwanda',
  },
} as const;

export const AUTH_BACKGROUNDS = [
  'https://mod.gov.rw/sites/default/files/styles/hero/public/2024-05/graduation.jpg',
  BRANDING.logoUrl,
] as const;
