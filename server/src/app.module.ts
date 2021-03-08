import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CompanyModule } from "./company/company.module";
import { RegistrationModule } from "./registration/registration.module";
import { NotificationModule } from "./notification/notification.module";
import { StateModule } from "./state/state.module";
import { DocumentModule } from "./document/document.module";
import { AgentModule } from "./agent/agent.module";
import { JournalCategoryModule } from "./journalCategory/journalCategory.module";
import { JournalAccountModule } from "./journalAccount/journalAccount.module";
import { JournalModule } from "./journal/journal.module";
import { FormModule } from "./form/form.module";
import { EmailListModule } from "./emailList/emailList.module";
import { EmailTemplateModule } from "./emailTemplate/emailTemplate.module";
import { EmailQueueModule } from "./emailQueue/emailQueue.module";
import { LogModule } from "./log/log.module";
import { LogEmailModule } from "./logEmail/logEmail.module";
import { LogTextModule } from "./logText/logText.module";
import { ReminderModule } from "./reminder/reminder.module";
import { AffiliateStatModule } from "./affiliateStat/affiliateStat.module";
import { GeoCountryModule } from "./geoCountry/geoCountry.module";
import { GeoStateModule } from "./geoState/geoState.module";
import { GeoCityModule } from "./geoCity/geoCity.module";
import { CouponModule } from "./coupon/coupon.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    CompanyModule,
    RegistrationModule,
    NotificationModule,
    StateModule,
    DocumentModule,
    AgentModule,
    JournalCategoryModule,
    JournalAccountModule,
    JournalModule,
    FormModule,
    EmailListModule,
    EmailTemplateModule,
    EmailQueueModule,
    LogModule,
    LogEmailModule,
    LogTextModule,
    ReminderModule,
    AffiliateStatModule,
    GeoCountryModule,
    GeoStateModule,
    GeoCityModule,
    CouponModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
