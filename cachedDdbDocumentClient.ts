import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client";

const profileDict: Record<string, Record<string, DynamoDBClient>> = {};
const envDict: Record<string, DynamoDBClient> = {};

export const cachedDdbDocumentClient = ({
  awsRegion,
  profile,
}: {
  awsRegion: string;
  profile: string | null;
}): DynamoDBDocumentClient => {
  const raw = cachedAwsSdkV3Client<DynamoDBClient>(
    DynamoDBClient,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
  return DynamoDBDocumentClient.from(raw);
};
