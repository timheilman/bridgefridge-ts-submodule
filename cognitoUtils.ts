import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
export const cognitoUser = ({
  userPoolId,
  cognitoIdpClient,
  usernameOrEmail,
}: {
  cognitoIdpClient: CognitoIdentityProviderClient;
  userPoolId: string;
  usernameOrEmail: string;
}) =>
  cognitoIdpClient.send(
    new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: usernameOrEmail,
    }),
  );
