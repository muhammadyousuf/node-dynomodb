class ResponseData {
  constructor(data) {
    this.data = data;
  }
}

class OKSuccess extends ResponseData {
  constructor(message, data) {
    super(data);
    this.messageText = message;
    this.name = this.constructor.name;
    this.status = 200;
  }
}

class FoundSuccess extends ResponseData {
  constructor(message, data) {
    super(data);
    this.messageText = message;
    this.name = this.constructor.name;
    this.status = 302;
  }
}

class CreatedSuccess extends ResponseData {
  constructor(message, data) {
    super(data);
    this.messageText = message;
    this.name = this.constructor.name;
    this.status = 201;
  }
}

class AcceptedSuccess extends ResponseData {
  constructor(message, data) {
    super(data);
    this.messageText = message;
    this.name = this.constructor.name;
    this.status = 202;
  }
}

class SuccessWithValidation extends ResponseData {
  constructor(message, data) {
    super(data);
    this.messageText = message;
    this.name = this.constructor.name;
    this.status = 209;
  }
}

module.exports = {
  OKSuccess,
  FoundSuccess,
  CreatedSuccess,
  AcceptedSuccess,
  SuccessWithValidation,
};
