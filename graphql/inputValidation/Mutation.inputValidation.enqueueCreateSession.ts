import { MutationEnqueueCreateSessionArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationEnqueueCreateSession: InputValidator<
  MutationEnqueueCreateSessionArgs
> = ({ args, cogIdentity }) => {
  const multitenancyError = errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only create sessions for one's own club.",
  });
  if (multitenancyError) {
    return multitenancyError;
  }
  const { boardsPerRound, roundCount, tableCount } = args.input;

  // TODO: ensure they are integers too!
  if (boardsPerRound < 1 || roundCount < 1 || tableCount < 1) {
    return {
      msg: "Invalid session parameters: boardsPerRound, roundCount, and tableCount must be positive integers",
      errorType: "400: Invalid session parameters",
    };
  }
  return;
};
