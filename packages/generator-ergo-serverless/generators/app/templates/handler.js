const Template = require('./lib/template');
const Moment = require('moment');

exports.ciceroTemplate = async (event) => {
  try {
    const contract = new Template();
    const params = {
      contract: event.contractData,
      request: event.request,
      state: event.state,
      now: Moment(),
    };
    const response = contract[event.clause].call(null, params);
    return response;
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      message: err.message,
    };
  }
};
