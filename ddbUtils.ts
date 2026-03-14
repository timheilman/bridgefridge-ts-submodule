import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

export const recordsForPk = async ({
  ddbDocClient,
  tableName,
  pkId,
  pkKeyFn,
}: {
  ddbDocClient: DynamoDBDocumentClient;
  tableName: string;
  pkId: string;
  pkKeyFn: (pkId: string) => string;
}) => {
  const { Items } = await ddbDocClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": pkKeyFn(pkId) },
    }),
  );
  return Items ?? [];
};
