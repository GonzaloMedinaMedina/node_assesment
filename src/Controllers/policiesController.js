
export function registerPoliciesEndPoints(app)
{
  app.get('/policies', (req, res) => {
    res.send('first policy endpoint');
  });
}