const { v4: uuidv4 } = require("uuid");
const Form = require("../models/form");

const generateShareLink = async () => {
  let link, existingForm;

  do {
    link = uuidv4().substr(0, 8);
    existingForm = await Form.findOne({ shareableLink: link });
  } while (existingForm);

  return link;
};

module.exports = generateShareLink;
