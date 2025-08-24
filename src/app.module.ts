import { DBModule } from '@libs/db/db.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { validateEnv } from '@src/libs/core/utils/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './libs/core/auth/guards/jwt-auth-guard';
import { TriggerModule, UserModule } from './modules';
import { ActionModule } from './modules/action/action.module';
import { NodeObjectModule } from './modules/nodeObject/node-object.module';
import { ResourceTemplateModule } from './modules/reponseTemplate/resourceTemplate.module';
import { ResponseModule } from './modules/response/response.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: config => {
        return validateEnv(config);
      },
    }),
    DBModule,
    UserModule,

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): ApolloDriverConfig => ({
        autoSchemaFile: true,
        playground: true,
        formatError: err => ({
          message: err.message,
          status: err.extensions?.code,
          statusCode: (err.extensions?.originalError as any)?.statusCode,
        }),
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
        }),
      }),
    }),
    ActionModule,
    TriggerModule,
    ResponseModule,
    ResourceTemplateModule,
    NodeObjectModule,
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            ignore: 'pid,req,res,hostname',
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
