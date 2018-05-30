const mortice = require('../../')

module.exports = (self) => {
  const mutex = mortice({
    global: self
  })

  mutex.writeLock(() => {
    return new Promise((resolve, reject) => {
      self.postMessage({
        type: 'log',
        message: 'write 1'
      })

      resolve()
    })
  })
    .then(() => {})

  mutex.readLock(() => {
    return new Promise((resolve, reject) => {
      self.postMessage({
        type: 'log',
        message: 'read 1'
      })

      resolve()
    })
  })
    .then(() => {})

  mutex.readLock(() => {
    return new Promise((resolve, reject) => {
      self.postMessage({
        type: 'log',
        message: 'read 2'
      })

      resolve()
    })
  })

  mutex.readLock(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        self.postMessage({
          type: 'log',
          message: 'read 3'
        })

        resolve()
      }, 500)
    })
  })

  mutex.writeLock(() => {
    return new Promise((resolve, reject) => {
      self.postMessage({
        type: 'log',
        message: 'write 2'
      })

      resolve()
    })
  })

  mutex.readLock(() => {
    return new Promise((resolve, reject) => {
      self.postMessage({
        type: 'log',
        message: 'read 4'
      })

      self.postMessage({
        type: 'done'
      })

      resolve()
    })
  })
}
