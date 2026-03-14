import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";
interface CognitoUserParams {
  cognitoIdpClient: CognitoIdentityProviderClient;
  userPoolId: string;
  usernameOrEmail: string;
}

export const cognitoUser = ({
  userPoolId,
  cognitoIdpClient,
  usernameOrEmail,
}: CognitoUserParams) =>
  cognitoIdpClient.send(
    new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: usernameOrEmail,
    }),
  );
export const nullableCognitoUser = async (params: CognitoUserParams) => {
  try {
    return await cognitoUser(params);
  } catch (e) {
    if (e instanceof UserNotFoundException) {
      return null;
    }
    throw e;
  }
};
