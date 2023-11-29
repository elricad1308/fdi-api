class ApiController {
  ping (req, res) {
    res.status(200)
      .type('text/plain')
      .send('Hello from ITS-Api-Public')
  }
}

const controller = new ApiController()

export const { ping } = controller

export default ApiController
