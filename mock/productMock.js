import faker from 'faker-br'

export const productMock = {
  name: faker.commerce.product(),
  positiveValue: faker.commerce.price(),
  negativeValue: `${'-'}${faker.commerce.price()},`,
}