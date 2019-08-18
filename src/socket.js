// Socket.io lib
const io = require('socket.io')

// Env config
const config = require('./config')

class Socket {
  constructor() {
    // Connections cache
    this.connections = []
  }

  init() {
    this.socket = io(config.port, {
      transports: ['websockets']
    })

    this.socket.on('connect', (_socket) => {
      const { handshake, client } = _socket
      const { userId, role } = handshake.query

      // Remove active connections for this user
      this.removeConnection(userId)

      // Create new use connection
      this.createConnection(userId, client.id, role, _socket)

      // Let the user know that we are connected
      _socket.emit('connection_complete')

      // List events
      if (role === 0) this.userEvents(userId, socket)
    })
  }

  /**
   * 
   * @param {String} userId 
   * @param {io.Socket} socket 
   */
  async userEvents(userId, socket) {
    // Add user to queue
    socket.on('start', async ({ name, phone, ip, email, priority, service }) => {
      // Create user on firebase and insert it
      
    })
  }

  /**
   * Find active connection by user ID or session ID
   * 
   * @param {String} id 
   */
  findConnection(id) {
    return this.connections.find(p => p.userId === id || p.sessionId === id)
  }

  /**
   * Create a new connection for user
   * 
   * @param {Number} userId 
   * @param {String} sessionId 
   * @param {String} role 
   * @param {Object} _socket 
   */
  createConnection(userId, sessionId, role, _socket) {
    this.connections.push({
      userId,
      sessionId,
      role,
      _socket
    })
  }

  /**
   * Remove connection by user ID
   * 
   * @param {Number} userId 
   */
  removeConnection(userId) {
    const index = this.connections.findIndex(p => p.userId === userId)

    if (index !== -1) {
      this.connections.splice(index, 1)
    }
  }
}

module.exports = new Socket()
