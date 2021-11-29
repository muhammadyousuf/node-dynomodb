exports.handler = async (event) => {
  console.log("my first lambda create code base", event);
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
