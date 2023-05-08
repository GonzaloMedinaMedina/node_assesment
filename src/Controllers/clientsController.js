
export function registerClientsEndPoints(app)
{
  app.get('/clients', (req, res) => {
    res.send('first client endpoint');
  });
}