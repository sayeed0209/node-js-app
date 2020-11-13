const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.checkID = (req, res, next, value) => {
  console.log(`tour id is ${value}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      massage: 'invalid id property',
    });
  }
  next();
};
exports.CheckBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'You have not specified anything on the body',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: { tours },
  });
};
exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: 'OK',
    data: { tour },
  });
};

exports.createNewTour= (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
console.log(tours)
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};
exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: 'OK',
    data: { tour: '<updated tour here>' },
  });
};

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  res.status(204).json({
    status: 'OK',
    data: null,
  });
};
