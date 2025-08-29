/** @type {import('vitest').Config} */
export default {
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
    coverage: { reporter: ['text', 'html'] },
    setupFiles: ['./test/setup.js']
  }
};
