import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin, { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  app: app.App;
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private readonly configService: ConfigService) {
    if (!admin.apps.length) {
      try {
        this.app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: this.configService.get('FIREBASE_PROJECT_ID'),
            clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
            privateKey: this.configService.get('FIREBASE_PRIVATE_KEY'),
          }),
        });
        this.logger.log('Initialized successfully');
      } catch (error) {
        this.logger.error(error);
      }
    }
  }

  getFirestoreClient() {
    if (!this.app) {
      return null;
    }
    return this.app.firestore();
  }
}
