import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockQuiz } from '../testUtils/mockQuiz';

beforeEach(() => {
  // Mock the backend call
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockQuiz,
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('generates a quiz, answers, submits, and shows score', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Enter topic and generate
  const topicInput = screen.getByLabelText(/topic/i);
  await user.type(topicInput, 'whales');
  await user.click(screen.getByRole('button', { name: /generate quiz/i }));

  // Questions appear
  const list = await screen.findByRole('list'); // <ol>
  const items = within(list).getAllByRole('listitem');
  expect(items).toHaveLength(5);

  // Select first option for each question
  for (let i = 0; i < items.length; i++) {
    const radios = within(items[i]).getAllByRole('radio');
    await user.click(radios[0]); // choose A for simplicity
  }

  // Submit quiz
  await user.click(screen.getByRole('button', { name: /submit quiz/i }));

  // Results show up
  expect(
    await screen.findByText(/score:/i)
  ).toBeInTheDocument();

  // New Quiz button appears
  expect(screen.getByRole('button', { name: /new quiz/i })).toBeInTheDocument();
});
