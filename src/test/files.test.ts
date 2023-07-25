import request from 'supertest';
import { App } from '@/app';
import { FilesRoute } from '@/routes/files.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Filess API', () => {
  const route = new FilesRoute();
  const app = new App();

  describe('[POST] /files', () => {
    it('response statusCode 201 /created', async () => {
      return request(app.getServer()).post(`${route.path}`).send('{}').expect(201);
    });
  });
});
