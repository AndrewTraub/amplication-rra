import { ArgsType, Field } from "@nestjs/graphql";
import { NotificationWhereUniqueInput } from "./NotificationWhereUniqueInput";

@ArgsType()
class DeleteNotificationArgs {
  @Field(() => NotificationWhereUniqueInput, { nullable: false })
  where!: NotificationWhereUniqueInput;
}

export { DeleteNotificationArgs };
