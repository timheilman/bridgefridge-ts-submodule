import {
  Subscription,
  SubscriptionOnAssignPlayerArgs,
  SubscriptionOnDeleteClubHumanArgs,
  SubscriptionOnDeleteSessionArgs,
  SubscriptionOnNotifyCreateClubDeviceArgs,
  SubscriptionOnNotifyCreateClubHumanArgs,
  SubscriptionOnNotifyCreateSessionArgs,
  SubscriptionOnNotifyDeleteClubDeviceArgs,
  SubscriptionOnNotifyUpdateClubHumanArgs,
  SubscriptionOnUnassignPlayersArgs,
  SubscriptionOnUpdateBoardResultArgs,
  SubscriptionOnUpdateClubNameArgs,
  SubscriptionOnUpdateCurrentSessionIdArgs,
  SubscriptionOnUpdateTableAssignmentArgs,
} from "./appsync";

export type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export type SubscriptionNames = keyof Omit<Subscription, "__typename">;

export interface KeyedGeneratedSubscription<
  NAME extends SubscriptionNames,
  ARGS,
> {
  gql: GeneratedSubscription<ARGS, Pick<Subscription, NAME>>;
  __subscriptionName: NAME;
}

export const createKeyedGeneratedSubscription = <
  NAME extends SubscriptionNames,
  ARGS,
>(
  subGql: string,
  subscriptionName: NAME,
) => {
  return {
    gql: subGql,
    __subscriptionName: subscriptionName,
  } as KeyedGeneratedSubscription<NAME, ARGS>;
};
export const subIdToSubGql = {
  onNotifyCreateSession: createKeyedGeneratedSubscription<
    "onNotifyCreateSession",
    SubscriptionOnNotifyCreateSessionArgs
  >(
    /* GraphQL */ `
      subscription OnNotifyCreateSession($clubId: String!) {
        onNotifyCreateSession(clubId: $clubId) {
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
    "onNotifyCreateSession",
  ),
  onDeleteSession: createKeyedGeneratedSubscription<
    "onDeleteSession",
    SubscriptionOnDeleteSessionArgs
  >(
    /* GraphQL */ `
      subscription OnDeleteSession($clubId: String!) {
        onDeleteSession(clubId: $clubId) {
          sessionId
        }
      }
    `,
    "onDeleteSession",
  ),

  onUpdateCurrentSessionId: createKeyedGeneratedSubscription<
    "onUpdateCurrentSessionId",
    SubscriptionOnUpdateCurrentSessionIdArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateCurrentSessionId($clubId: String!) {
        onUpdateCurrentSessionId(clubId: $clubId) {
          newCurrentSessionId
        }
      }
    `,
    "onUpdateCurrentSessionId",
  ),

  onUpdateClubName: createKeyedGeneratedSubscription<
    "onUpdateClubName",
    SubscriptionOnUpdateClubNameArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateClubName($clubId: String!) {
        onUpdateClubName(clubId: $clubId) {
          clubId
          newClubName
        }
      }
    `,
    "onUpdateClubName",
  ),
  onUpdateTableAssignment: createKeyedGeneratedSubscription<
    "onUpdateTableAssignment",
    SubscriptionOnUpdateTableAssignmentArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateTableAssignment($clubId: String!) {
        onUpdateTableAssignment(clubId: $clubId) {
          clubId
          sessionId
          clientId
          tableAssignment {
            tableNumber
            clubDeviceId
            confirmed
            round
            roundWelcomeConfirmed
            currentAsOf
            playerAssignments {
              directionLetter
              clubHumanId
              displayName
            }
            results {
              board
              round
              type
              level
              strain
              doubling
              declarer
              leadRank
              leadSuit
              wonTrickCount
              confirmed
              currentAsOf
            }
          }
        }
      }
    `,
    "onUpdateTableAssignment",
  ),
  onAssignPlayer: createKeyedGeneratedSubscription<
    "onAssignPlayer",
    SubscriptionOnAssignPlayerArgs
  >(
    /* GraphQL */ `
      subscription OnAssignPlayer($clubId: String!) {
        onAssignPlayer(clubId: $clubId) {
          clubId
          sessionId
          clubDeviceId
          tableNumber
          directionLetter
          clubHumanId
          displayName
        }
      }
    `,
    "onAssignPlayer",
  ),
  onUnassignPlayers: createKeyedGeneratedSubscription<
    "onUnassignPlayers",
    SubscriptionOnUnassignPlayersArgs
  >(
    /* GraphQL */ `
      subscription OnUnassignPlayers($clubId: String!) {
        onUnassignPlayers(clubId: $clubId) {
          clubId
          sessionId
          clubDeviceId
          tableNumber
        }
      }
    `,
    "onUnassignPlayers",
  ),
  onUpdateBoardResult: createKeyedGeneratedSubscription<
    "onUpdateBoardResult",
    SubscriptionOnUpdateBoardResultArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateBoardResult($clubId: String!) {
        onUpdateBoardResult(clubId: $clubId) {
          clubId
          tableNumber
          sessionId
          boardResult {
            type
            board
            round
            level
            strain
            doubling
            declarer
            leadRank
            leadSuit
            wonTrickCount
            confirmed
            currentAsOf
          }
          clientId
        }
      }
    `,
    "onUpdateBoardResult",
  ),
  onNotifyCreateClubHuman: createKeyedGeneratedSubscription<
    "onNotifyCreateClubHuman",
    SubscriptionOnNotifyCreateClubHumanArgs
  >(
    /* GraphQL */ `
      subscription OnNotifyCreateClubHuman($clubId: String!) {
        onNotifyCreateClubHuman(clubId: $clubId) {
          error
          clubHuman {
            clubId
            displayName
            clubHumanId
            humanId
          }
        }
      }
    `,
    "onNotifyCreateClubHuman",
  ),
  onNotifyUpdateClubHuman: createKeyedGeneratedSubscription<
    "onNotifyUpdateClubHuman",
    SubscriptionOnNotifyUpdateClubHumanArgs
  >(
    /* GraphQL */ `
      subscription OnNotifyUpdateClubHuman($clubId: String!) {
        onNotifyUpdateClubHuman(clubId: $clubId) {
          error
          clubHuman {
            clubId
            displayName
            clubHumanId
            humanId
          }
        }
      }
    `,
    "onNotifyUpdateClubHuman",
  ),
  onDeleteClubHuman: createKeyedGeneratedSubscription<
    "onDeleteClubHuman",
    SubscriptionOnDeleteClubHumanArgs
  >(
    /* GraphQL */ `
      subscription OnDeleteClubHuman($clubId: String!) {
        onDeleteClubHuman(clubId: $clubId) {
          clubId
          clubHumanId
          displayName
          humanId
        }
      }
    `,
    "onDeleteClubHuman",
  ),
  onNotifyCreateClubDevice: createKeyedGeneratedSubscription<
    "onNotifyCreateClubDevice",
    SubscriptionOnNotifyCreateClubDeviceArgs
  >(
    /* GraphQL */ `
      subscription OnNotifyCreateClubDevice($clubId: String!) {
        onNotifyCreateClubDevice(clubId: $clubId) {
          clubId
          clubDeviceId
          name
          email
          createdAt
          regToken
        }
      }
    `,
    "onNotifyCreateClubDevice",
  ),
  onNotifyDeleteClubDevice: createKeyedGeneratedSubscription<
    "onNotifyDeleteClubDevice",
    SubscriptionOnNotifyDeleteClubDeviceArgs
  >(
    /* GraphQL */ `
      subscription OnNotifyDeleteClubDevice($clubId: String!) {
        onNotifyDeleteClubDevice(clubId: $clubId) {
          clubId
          clubDeviceId
        }
      }
    `,
    "onNotifyDeleteClubDevice",
  ),
} as const;
