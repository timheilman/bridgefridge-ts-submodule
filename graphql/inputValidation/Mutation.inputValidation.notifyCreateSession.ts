import { MutationNotifyCreateSessionArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationNotifyCreateSession: InputValidator<
  MutationNotifyCreateSessionArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only notify creation of sessions for one's own club.",
  });
