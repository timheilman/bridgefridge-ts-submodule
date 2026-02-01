import { MutationUpdateCurrentSessionIdArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationUpdateCurrentSessionId: InputValidator<
  MutationUpdateCurrentSessionIdArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only update one's own club",
  });
