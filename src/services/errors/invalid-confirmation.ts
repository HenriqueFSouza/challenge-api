export class InvalidConfirmationError extends Error {
  constructor() {
    super('Invalid confirmation');
  }
}