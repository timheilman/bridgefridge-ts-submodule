import {
  Query,
  QueryGetClubArgs,
  QueryGetSessionArgs,
  QueryListClubDeviceRegistrationsArgs,
  QueryListClubDevicesArgs,
  QueryListClubHumansArgs,
  QueryListSessionsArgs,
} from "./appsync";

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

type QueryNames = keyof Omit<Query, "__typename">;

interface KeyedGeneratedQuery<NAME extends QueryNames, ARGS> {
  gql: GeneratedQuery<ARGS, Pick<Query, NAME>>;
  __queryName: NAME;
}

const createKeyedGeneratedQuery = <NAME extends QueryNames, ARGS>(
  queryGql: string,
  queryName: NAME,
) => {
  return {
    gql: queryGql,
    __queryName: queryName,
  } as KeyedGeneratedQuery<NAME, ARGS>;
};
export const qidToQueryGql = {
  getClub: createKeyedGeneratedQuery<"getClub", QueryGetClubArgs>(
    /* GraphQL */ `
      query getClub($clubId: String!) {
        getClub(clubId: $clubId) {
          id
          name
          createdAt
          currentSessionId
        }
      }
    `,
    "getClub",
  ),
  listClubDeviceRegistrations: createKeyedGeneratedQuery<
    "listClubDeviceRegistrations",
    QueryListClubDeviceRegistrationsArgs
  >(
    /* GraphQL */ `
      query listClubDeviceRegistrations(
        $input: ListClubDeviceRegistrationsInput!
      ) {
        listClubDeviceRegistrations(input: $input) {
          items {
            clubId
            createdAt
            deviceName
            regToken
            ttl
            updatedAt
          }
          nextToken
        }
      }
    `,
    "listClubDeviceRegistrations",
  ),
  listClubDevices: createKeyedGeneratedQuery<
    "listClubDevices",
    QueryListClubDevicesArgs
  >(
    /* GraphQL */ `
      query listClubDevices($input: ListClubDevicesInput!) {
        listClubDevices(input: $input) {
          items {
            clubDeviceId
            name
          }
          nextToken
        }
      }
    `,
    "listClubDevices",
  ),
  listSessions: createKeyedGeneratedQuery<
    "listSessions",
    QueryListSessionsArgs
  >(
    /* GraphQL */ `
      query listSessions($input: ListSessionsInput!) {
        listSessions(input: $input) {
          items {
            boardsPerRound
            clubId
            createdAt
            sessionId
            label
            movement
            roundCount
            tableAssignments {
              clubDeviceId
              confirmed
              currentAsOf
              playerAssignments {
                directionLetter
                displayName
                clubHumanId
              }
              results {
                board
                confirmed
                currentAsOf
                declarer
                doubling
                leadRank
                leadSuit
                level
                round
                strain
                type
                wonTrickCount
              }
              round
              roundWelcomeConfirmed
              tableNumber
            }
            tableCount
          }
          nextToken
        }
      }
    `,
    "listSessions",
  ),
  listClubHumans: createKeyedGeneratedQuery<
    "listClubHumans",
    QueryListClubHumansArgs
  >(
    /* GraphQL */ `
      query listClubHumans($input: ListClubHumansInput!) {
        listClubHumans(input: $input) {
          items {
            clubId
            clubHumanId
            displayName
          }
          nextToken
        }
      }
    `,
    "listClubHumans",
  ),
  getSession: createKeyedGeneratedQuery<"getSession", QueryGetSessionArgs>(
    /* GraphQL */ `
      query getSession($input: GetSessionInput!) {
        getSession(input: $input) {
          boardsPerRound
          clubId
          createdAt
          sessionId
          label
          movement
          roundCount
          tableAssignments {
            clubDeviceId
            confirmed
            currentAsOf
            playerAssignments {
              directionLetter
              displayName
              clubHumanId
            }
            results {
              board
              confirmed
              currentAsOf
              declarer
              doubling
              leadRank
              leadSuit
              level
              round
              strain
              type
              wonTrickCount
            }
            round
            roundWelcomeConfirmed
            tableNumber
          }
          tableCount
        }
      }
    `,
    "getSession",
  ),
};
