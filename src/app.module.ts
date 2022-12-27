import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { CallModule } from './call/call.module';
import { AdminModule } from '@adminjs/nestjs'
import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/typeorm'
import { CallController } from './call/call.controller';
import { CallService } from './call/call.service';
import { Call } from './call/entities/call.entity';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { WorkspaceModule } from './workspace/workspace.module';
import { WorkspaceController } from './workspace/workspace.controller';
import { WorkspaceService } from './workspace/workspace.service';


const DEFAULT_ADMIN = {
  email: 'admin@admin.com',
  password: 'password',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

AdminJS.registerAdapter({ Database, Resource })

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule.createAdminAsync({
      imports: [
        TypeOrmModule.forFeature([User, Call]),
      ],
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [User, Call],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret'
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    UserModule,
    AuthModule,
    WorkspaceModule,
    CallModule
  ],
  controllers: [AppController, UserController, CallController, WorkspaceController],
  providers: [AppService, UserService, CallService, WorkspaceService],
})
export class AppModule {}
