import nextConfig from 'eslint-config-next'

// .prompt is git-ignored reference material, so CI never sees it. Its .ts files
// contain JSX, which fails parsing on any machine that has the folder.
const eslintConfig = [...nextConfig, { ignores: ['.prompt/**'] }]

export default eslintConfig
