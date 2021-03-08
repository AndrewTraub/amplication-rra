import { Module } from "@nestjs/common";
import { StateModuleBase } from "./base/state.module.base";
import { StateService } from "./state.service";
import { StateController } from "./state.controller";
import { StateResolver } from "./state.resolver";

@Module({
  imports: [StateModuleBase],
  controllers: [StateController],
  providers: [StateService, StateResolver],
  exports: [StateService],
})
export class StateModule {}
