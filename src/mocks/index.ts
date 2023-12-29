import { isClient } from '@/utils';

const initMocks = async () => {
  if (isClient) {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  } else {
    const { server } = await import('./server');
    server.listen();
  }
};

export { initMocks };
