import http from "http";
import readline from "readline";

const readUserInput = readline.createInterface(
{
  input: process.stdin,
  output: process.stdout
});

function getEndPointPath(e)
{
  if (e == 0)
    return "/client/byId";
  else if (e == 1)
  return "/client/byUserName";
  else if (e == 2)
    return "/client/byPolicyNumber";
  else if (e == 3)
    return "/policies/ByUserName";
}

function getParameterQuestion(e)
{
  if (e == 0)
    return "user id."
  else if (e == 1 || e == 3)
    return "user name."
  else if (e == 2)
    return "policy number."
}

function makeRequest(parameter, endPoinSelection, rolValue)
{
  const postData = JSON.stringify(
    {
        parameter: parameter,
        rol: rolValue
    })
    
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: endPoinSelection,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
  
    res.on('data', (response) => {
      process.stdout.write(response);
    });
  });
  
  req.on('error', (error) => {
    console.error(error);
  });
  
  req.write(postData);
  req.end();
}

readUserInput.question("Request as user (0) or admin (1).\n", (r) => {
  var rolValue = "user",
  endPoinSelection,
  parameterRequired;
  rolValue = r == 0 ? "user" : "admin";

  readUserInput.question("Desired Request?\n\t (0) Get user by id. \n\t (1) Get user by user name. \n\t (2) Get the user of a policy, \n\t (3) Get user policies.\n", (e) => 
  {
    endPoinSelection = getEndPointPath(e);
    parameterRequired = getParameterQuestion(e);
    
    readUserInput.question("Please, introduce " + parameterRequired + "\n", (parameterValue) => {
      readUserInput.close();
      makeRequest(parameterValue, endPoinSelection, rolValue);
    });
  });
});



