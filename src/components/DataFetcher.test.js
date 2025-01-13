/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import DataFetcher from './DataFetcher';

jest.mock('axios');
// test lint-staged with git pre-commit hook
describe('DataFetcher Component', () => {
  it('displays fetched data', async () => {
    const mockData = [
      { id: 1, name: 'test user1' },
      { id: 2, name: 'test user2' },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    render(<DataFetcher />);
    expect(screen.getByText(/Users/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('test user1')).toBeInTheDocument();
      expect(screen.getByText('test user2')).toBeInTheDocument();
    });
  });

  it('displays an error message on failure', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));

    render(<DataFetcher />);
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });
});
