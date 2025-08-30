import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockQuiz } from '../testUtils/mockQuiz';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => mockQuiz });
});

afterEach(() => jest.resetAllMocks());

test('New Quiz clears the topic textbox', async () => {
  const user = userEvent.setup();
  render(<App />);

  const topicInput = screen.getByLabelText(/topic/i);
  await user.type(topicInput, 'Ancient Rome');
  await user.click(screen.getByRole('button', { name: /generate quiz/i }));

  // Wait for quiz to render
  await screen.findByText(/topic: whales/i); // from mockQuiz

  // Submit to show New Quiz button
  await user.click(screen.getByRole('button', { name: /submit quiz/i }));
  await user.click(screen.getByRole('button', { name: /new quiz/i }));

  // Topic input should be cleared
  expect(topicInput).toHaveValue('');
});
