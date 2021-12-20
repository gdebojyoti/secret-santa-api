module.exports = users => {
  const ids = []
  const mapping = {}
  const indexedUsers = users.map((user, index) => {
    const id = index + 'x' + Math.round(Math.random() * 100000)
    ids.push(id)
    mapping[id] = ''
    return {
      ...user,
      id
    }
  })
  const backupIds = [...ids]

  for (let i = 0, limit = ids.length; i < limit; i++) {
    const randomIndex = Math.floor(Math.random() * ids.length)
    mapping[backupIds[i]] = ids.splice(randomIndex, 1)[0]
  }

  console.log("mapping", mapping)

  return {
    indexedUsers,
    mapping
  }
}