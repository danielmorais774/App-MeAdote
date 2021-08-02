import app from './app';

const port = 3333;
app.listen({ port }, () =>
  console.info('server online...', `http://localhost:${port}/`),
);