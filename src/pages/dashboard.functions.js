export function html() {
  return `
    <li class="db__record"><a href="#">
      Таблица #1</a>
      <strong>12.12.2012</strong>
    </li>  
  `
}
function getAllKeys() {
  const keys = []
  for (let i=0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}
export function createRecordsTable() {
  const keys = getAllKeys()
  console.log('keys', keys)
  if (!keys.length) {
    return `<p>You are not created any table</p>`
  }
  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
      ${keys.map(html).join('')}
    </ul>
  `
}