import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

export const recordsForPk = async ({
  ddbDocClient,
  tableName,
  pk,
}: {
  ddbDocClient: DynamoDBDocumentClient;
  tableName: string;
  pk: string;
}) => {
  const { Items } = await ddbDocClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": pk },
    }),
  );
  return Items ?? [];
};
