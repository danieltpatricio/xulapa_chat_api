module.exports = [
  /**
   * Register route
   */
  {
    request: '/v1/support/register',
    body: [
      {
        name: 'name',
        required: true
      },
      {
        name: 'email',
        required: true
      },
      {
        name: 'password',
        required: true
      }
    ]
  }
]