import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// @microsoft/clarity ships ESM that Jest can't parse
jest.mock('./components/Clarity', () => () => null);

test('renders the hero headline', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Hi, I'm/i);
});

test('renders primary navigation', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /primary/i });
  expect(nav).toBeInTheDocument();
});
