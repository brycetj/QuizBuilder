export const mockQuiz = {
  topic: 'whales',
  questions: Array.from({ length: 5 }, (_, i) => ({
    prompt: `Mock question ${i + 1}?`,
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 2,
    explanation: 'Because reasons.'
  }))
};
