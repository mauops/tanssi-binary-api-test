afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Files API', () => {
  // const route = new FilesController();
  // const app = new App();

  describe('[POST] /files', () => {
    it('response statusCode 201 /created', async () => {
      // TODO: add tests
    });
  });
});
