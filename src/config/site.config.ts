export const SITE_CONFIG = {
  name: import.meta.env.VITE_APP_NAME,
  city: import.meta.env.VITE_CITY,
  phone: import.meta.env.VITE_CONTACT_PHONE,
  maps: {
    embed: import.meta.env.VITE_GOOGLE_MAPS_EMBED,
    link: import.meta.env.VITE_GOOGLE_MAPS_LINK,
  },
}