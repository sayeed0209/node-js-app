const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
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
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      massage: 'invalid id property',
    });
  }
  res.status(200).json({
    status: 'OK',
    data: { tour },
  });
};

exports.createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'OK',
        data: { tour: newTours },
      });
    }
  );
};
exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      massage: 'invalid id property',
    });
  }
  res.status(200).json({
    status: 'OK',
    data: { tour: '<updated tour here>' },
  });
};

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      massage: 'invalid id property',
    });
  }
  res.status(204).json({
    status: 'OK',
    data: null,
  });
};
