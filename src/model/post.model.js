const dynamoose = require("dynamoose");
const uuid = require("uuid");
const post = dynamoose.model(
  "convolytica",
  new dynamoose.Schema(
    {
      id: {
        type: String,
        required: true,
        default: () => {
          return uuid.v4();
        },
        rangeKey: true,
        index: {
          global: true,
        },
      },
      name: String,
      admin: {
        type: String,
        index: {
          global: true,
        },
        hashKey: true,
      },
      isAppInstalled: {
        type: Boolean,
        required: true,
      },
      cognitoUserId: {
        type: String,
      },
      platform: String,
      username: {
        type: String,
        index: {
          local: true,
        },
      },
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
  )
);

module.exports = post;
