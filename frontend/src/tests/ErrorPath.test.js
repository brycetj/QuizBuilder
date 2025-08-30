import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

afterEach(() => jest.resetAllMocks());

test('shows an error alert when backend fails', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: 'LLM failed' })
  });

  const user = userEvent.setup();
  render(<App />);

  const topicInput = screen.getByLabelText(/topic/i);
  await user.type(topicInput, 'bad-topic');
  await user.click(screen.getByRole('button', { name: /generate quiz/i }));

  expect(await screen.findByText(/request failed/i)).toBeInTheDocument();
});
