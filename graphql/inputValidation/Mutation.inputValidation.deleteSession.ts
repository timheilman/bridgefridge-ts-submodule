import { MutationDeleteSessionArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationDeleteSession: InputValidator<
  MutationDeleteSessionArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only delete sessions for one's own club.",
  });
