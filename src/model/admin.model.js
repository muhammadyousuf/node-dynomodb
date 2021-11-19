const dynamoose = require("dynamoose");
const uuid = require("uuid");

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
      default: () => {
        return uuid.v4();
      },
      index: {
        global: true
      },
    },
    cognitoUserId: {
      type: String,
    },
    platform: String,
    name: String,
    email: String,
    long_live_token: String,
    isGroupsAdded: { type: Boolean, default: false },
    isDataProcessing: { type: Boolean, default: false },
  },
  {
    saveUnknown: true,
    timestamps: {
      createdAt: "createDate",
      updatedAt: null, // updatedAt will not be stored as part of the timestamp
    },
  }
);

const admin = dynamoose.model("admin", schema);

module.exports = admin;
