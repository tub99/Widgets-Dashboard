// import { queryData } from "../../dynamoDbWithRedux";
// import { dataset } from "./fakeData";
import AWS from "aws-sdk";
import moment from "moment";
import parseData from "./parseData";

const acc_key = 'AKIAJU3JIJRV6IDSSL5Q',
    sec_key = 'QYEBOmTFz3ECE05Z4iGtoCB9eIZSdrZ8Dtwbh3sH',
    region = 'eu-west-1';
// AWS Configuration
AWS.config.update({
	"accessKeyId": acc_key, "secretAccessKey": sec_key, "region": region
});

const docClient = new AWS.DynamoDB.DocumentClient();

let lastMonthDate = (new Date() - 1000 * 3600 * 24 * 30);
lastMonthDate = moment(lastMonthDate).format();

const allSenid = ['MFD_4096', 'MFD_4352', 'MFD_4362','MFD_6666', 'MFD_6529','MFD_6656','MFD_4608','MFD_6528'];

export const loadDataset = () => {
	return async (dispatch, getState) => {
		// init an object that contain all raw data
		const allRawData = {};
		let count = 0;
		console.log("Querying from DynamoDB!");
		// Setting up the parameters
		allSenid.forEach(async (senid) => {
			const params = {
				TableName: "MFD01",
				KeyConditionExpression: 'SENID = :senid and DTM > :dtm',
				ExpressionAttributeValues: {
					":dtm" : lastMonthDate,
					":senid": senid
				}
			};
			// Start the request
			const request = await docClient.query(params, function(err, data) {
				 if (err) console.log(err);
				 return data
				});
			request.on('success', function(response) {
				// Manipulate the data here and get it back in the state
				count++;
				allRawData[senid] = response.data.Items;
				if(count >= allSenid.length){
					console.log(allRawData);
					// Manipulate the dynamoDB data
					console.log("END OF QUERYING DYNAMODB DATA");
					const formatedData = parseData(allRawData);

					// ======================
					//  Dispatch the action
					// ======================
					return dispatch({
						type: "LOAD_DATASET",
						dataset: formatedData
					});
				}
			});
		})
	}
}