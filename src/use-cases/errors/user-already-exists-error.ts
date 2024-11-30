export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-Mail already exists!')
  }
}
