const AWS = require("aws-sdk");
var fs = require("fs");
const path = require("path");
module.exports.serverCreate = async (req, res) => {
  try {
    // AWS.config.update({
    //   region: "us-`east`-2",
    // });

    var eventbridge = new AWS.EventBridge({ apiVersion: "2015-10-07" });
    eventbridge.putRule(
      { Name: "demo", ScheduleExpression: "rate(4 days)" },
      async function (err, data) {
        if (err) console.log(err, err.stack);
        // an error occurred
        else {
          // eventbridge.putTargets()
          console.log("data", path.dirname("./function.zip"));
          let rule = data.RuleArn;
          const lambda = new AWS.Lambda();
          lambda.createFunction(
            (params = {
              FunctionName: "test-demo",
              Role: `arn:aws:iam::445649812078:role/service-role/test-demo-role-y56e1ph2`,
              Runtime: "nodejs14.x",
              Handler: "index.handler",
              Code: {
                ZipFile: fs.readFileSync(path.join(__dirname, "function.zip")),
              },
              Description: "description goes here",
              Timeout: 10,
              MemorySize: 128,
              Publish: true,
            }),
            function (err, result) {
              if (err) console.log(err, err.stack);
              // an error occurred
              else {
                console.log("result", result);
                var params = {
                  FunctionName: "test-demo" /* required */,
                  //  Qualifier: "STRING_VALUE",
                };
                lambda.getFunction(params, async function (err, data) {
                  if (err) console.log(err, err.stack);
                  // an error occurred
                  else {
                    console.log("line 27", data.Configuration);
                    await lambda
                      .addPermission({
                        Action: "lambda:invokeFunction",
                        FunctionName: data.Configuration.FunctionArn,
                        StatementId:
                          "allow-rule-invoke-" + data.Configuration.RevisionId,
                        Principal: "events.amazonaws.com",
                        SourceArn: rule,
                      })
                      .promise();

                    eventbridge.putTargets(
                      {
                        Rule: "demo",
                        Targets: [
                          {
                            Arn: data.Configuration.FunctionArn,
                            Id: "1",
                            Input: JSON.stringify({ name: "muhammad" }),
                          },
                        ],
                      },
                      function (err, data) {
                        if (err) console.log(err, err.stack);
                        // an error occurred
                        else console.log("line 27", data); // successful response
                      }
                    );
                  } // successful response
                });
              } // successful response
            }
          );
          // var params = {
          //   FunctionName: "myImageProcessingLambdaFn" /* required */,
          // //  Payload: "PAYLOAD_AS_A_STRING",
          // };
          // lambda.invoke(params, function (err, data) {
          //   if (err) console.log(err, err.stack);
          //   // an error occurred
          //   else console.log(data); // successful response
          // });
         
        } // successful response
      }
    );
    res.status(200).send({
      ok: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(err.status).send(err);
  }
};
