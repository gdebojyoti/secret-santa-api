module.exports = users => {
  const ids = []
  const mapping = {}

  // assign random indexes to all users; populate ids & mapping
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

  // avoid self gifts
  const selfGiftees = backupIds.filter(id => mapping[id] === id)

  if (selfGiftees.length > 1) {
    selfGiftees.forEach((id, index) => {
      mapping[id] = selfGiftees[index === selfGiftees.length - 1 ? 0 : index + 1]
    })
  }
  if (selfGiftees.length === 1) {
    // exchange with first santa
    if (selfGiftees[0] !== backupIds[0]) {
      const temp = mapping[selfGiftees[0]]
      mapping[selfGiftees[0]] = mapping[backupIds[0]]
      mapping[backupIds[0]] = temp
    } else {
      // exchange with 2nd santa
      const temp = mapping[selfGiftees[0]]
      mapping[selfGiftees[0]] = mapping[backupIds[1]]
      mapping[backupIds[1]] = temp
    }
  }

  console.log("mapping", mapping)

  return {
    indexedUsers,
    mapping
  }
}