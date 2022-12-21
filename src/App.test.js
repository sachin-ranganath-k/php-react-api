import { render, screen } from '@testing-library/react';
import App from './App';
import Logout from './components/todo/Logout';
import TodoEntryReduxLogin from './components/todo/TodoEntryReduxLogin';

test('renders learn react link', () => {
  render(<Logout />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
