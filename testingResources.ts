import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { nullableCognitoUser, truthyUsername } from "./cognitoUtils";
import { clubIdFromKey, cognitoUserIdKey } from "./ddbSortkey";
import { recordsForPk } from "./ddbUtils";

export const CDK_SEEDED_CLUB_DEVICE_NAME =
  "cdk-test-device with long name to test truncation";

export const CDK_SEEDED_CLUB_HUMAN_DISPLAY_NAMES = new Set([
  "Nancy",
  "Norman",
  "Natalie",
  "Sam",
  "Susan",
  "Steve",
  "Emily",
  "Edward",
  "Emma",
  "William",
  "Walter",
  "Wendy",
]);

export const clubIdForAdminClubEmail = async ({
  cognitoIdpClient,
  ddbDocClient,
  userPoolId,
  adminClubEmail,
  bridgeFridgeTableName,
}: {
  cognitoIdpClient: CognitoIdentityProviderClient;
  ddbDocClient: DynamoDBDocumentClient;
  userPoolId: string;
  adminClubEmail: string;
  bridgeFridgeTableName: string;
}): Promise<string | null> => {
  const adminCogUser = await nullableCognitoUser({
    cognitoIdpClient,
    userPoolId,
    usernameOrEmail: adminClubEmail,
  });

  if (!adminCogUser) {
    return null;
  }

  const pk = cognitoUserIdKey(truthyUsername(adminCogUser));
  // 2. Query DDB with CGID#<userId> to find the club
  const cogUserClubRecords = await recordsForPk({
    ddbDocClient,
    tableName: bridgeFridgeTableName,
    pk,
  });
  const clubSk = cogUserClubRecords[0]?.sk as string | undefined;
  if (!clubSk) {
    return null;
  }

  const { result: clubId, error } = clubIdFromKey(clubSk);
  if (error) {
    throw new Error(error);
  }

  return clubId;
};
