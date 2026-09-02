// Tailwind is here for the admin pages only. It is loaded by app/admin/admin.css,
// which app/admin/layout.tsx is the only importer of.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
