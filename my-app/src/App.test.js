import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("illustrate mocks", () => {
  // arrange
  const mock = jest.fn().mockReturnValue("mocked name")
  const greeter = require('../app.js')
  greeter.getFullName = mock

  // act
  const result = greeter.greet("aman", "kumar")

  // assert
  expect(result).toBe("Hello! mocked name")
  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledTimes(1)
  expect(mock).toHaveBeenCalledWith("aman","kumar")
})

test("illustrate spy", () => {
  // arrange
  const greeter = require('../app.js')

  const getFullNameSpy = jest.spyOn(greeter, 'getFullName')
  
  // act
  const result = greeter.greet("aman", "kumar")

  // assert
  expect(getFullNameSpy).toHaveBeenCalled()
  expect(result).toBe("Hello! aman kumar")
  expect(getFullNameSpy).toHaveBeenCalledWith("aman","kumar")

})

function getUserData() {
  axios.get('https://reqres.in/api/users/2')
  .then(response => console.log(response.data))
  .catch(error => console.log(error));
}

const axios = require('axios')
jest.mock('axios');
  
describe("mock api calls", () => {
   test("mocking external endpoint in axios", () => {
  
       // arrange
       const mockedResponse = {data: {username:'test-user', address:'India'}}
       axios.get.mockResolvedValue(mockedResponse)
       const app = require('../app.js')
  
       // act
       app.getUserData()
  
       // asserts
       expect(axios.get).toHaveBeenCalled()
       expect(axios.get).toHaveBeenCalledWith('https://reqres.in/api/users/2')
  
   })
})