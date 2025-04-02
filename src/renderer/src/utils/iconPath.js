export default (iconName) => {
  return new URL(`../assets/icons/${iconName}`, import.meta.url).href
}
