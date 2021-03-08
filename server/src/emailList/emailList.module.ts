import { Module } from "@nestjs/common";
import { EmailListModuleBase } from "./base/emailList.module.base";
import { EmailListService } from "./emailList.service";
import { EmailListController } from "./emailList.controller";
import { EmailListResolver } from "./emailList.resolver";

@Module({
  imports: [EmailListModuleBase],
  controllers: [EmailListController],
  providers: [EmailListService, EmailListResolver],
  exports: [EmailListService],
})
export class EmailListModule {}
