import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Renju Game/i);
  expect(linkElement).toBeInTheDocument();
});

// npm test
// npm test -- --coverage