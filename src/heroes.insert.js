class Handler {
  async main() {
    try {
      return {
        statusCode: 200,
        body: 'Hello João Vieira!'
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error'
      }
    }
  }
}

//factory
const handler = new Handler();
module.exports = handler.main.bind(handler)