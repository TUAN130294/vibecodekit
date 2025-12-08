export const getHealth = () => ({
  status: 'ok',
  uptime: process.uptime()
});

