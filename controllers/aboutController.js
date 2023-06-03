// Project Team:
// - Sergey Artemeive (ID: 320689789)
// - Ohad Yael (ID: 208544866)
exports.getAbout = (req, res) => {
    const developers = [
      {
        firstname: 'Sergey',
        lastname: 'Artemeive',
        id: 320689789,
        email: 'sergio44k@gmail.com'
      },
      {
        firstname: 'Ohad ',
        lastname: 'Yael',
        id: 208544866,
        email: 'Ohadyael8@gmail.com'
      }
    ];
  
    res.json(developers);
  };
  
