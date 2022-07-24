const express = require('express');
const path = require('path');
const helper = require('./helper');

const app = express();
const port = 3000;

console.log(helper.dogs[0].name);

const head = `<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
  crossorigin="anonymous"
/>
<title>Adopt A Pet</title>
</head>`;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../express-exam', 'index.html'));
});

app.get('/animals', (req, res) => {
  const petTypes = ['dogs', 'cats', 'rabbits'];
  res.send(
    `${head}<div class="container text-center mt-5"><h1 class='mb-5'>List of pets types</h1><div class='border w-50 m-auto p-5 rounded shadow-lg' ><ul style='list-style-type: none'>
    ${petTypes.map(
      (type) =>
        `<a href="/animals/${type}" class='btn btn-success mx-3'><li>${
          type.charAt(0).toUpperCase() + type.slice(1)
        }</li></a>`,
    )}</ul></div><a href='/' class='btn btn-danger mt-5'>Home</a> </div>`,
  );
});

app.get('/animals/:pet_type', (req, res) => {
  const pets = req.params.pet_type;
  console.log(helper[pets].length);
  res.send(`${head}<div class="container text-center mt-5"><h1 class='mb-5'>Chose your ${req.params.pet_type.slice(
    0,
    -1,
  )}</h1>
  <h3 class='mb-5'>${req.params.pet_type.slice(0, -1)}${helper[pets].length > 1 ? 's' : ''} name${
    helper[pets].length > 1 ? 's' : ''
  }: </h3>
  <div class='border w-50 m-auto p-5 rounded shadow-lg' >${helper[pets].map(
    (el) => `
    <a href='/animals/${pets}/${el.name}' class='btn btn-success ms-3'><span>${el.name}</span></a>`,
  )}</div>
  <a href='/animals/' class='btn btn-info mt-5'>Back</a>
  </div`);
});

app.get('/animals/:pet_type/:name', (req, res) => {
  const type = req.params.pet_type;
  const name = req.params.name;
  const pet = helper[type].find((el) => el.name === name);
  res.send(`${head}<div class="container text-center mt-5"><h1 class='mb-5'>Your new pet called ${req.params.name}</h1>
  <div class='border w-50 m-auto p-5 rounded shadow-lg' >
  <img src=${pet.url} alt=${pet.breed} class='mb-5' style='width: 300px'/>
  <h5>Age: ${pet.age}</h5>
  <h5>Breed: ${pet.breed}</h5>
  <h5>Description:  ${pet.description}</h5>
  </div>
  <a href='/animals/' class='btn btn-info my-5'>Back</a>
  </div>
  `);
});

app.listen(port, () => {
  console.log(`'Adopt A Pet' app listening on port ${port}`);
});
