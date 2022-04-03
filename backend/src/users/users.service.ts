import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = 'https://api.soul-network.com';

@Injectable()
export class UsersService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: API_BASE_URL });
    axiosRetry(this.client, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  async findOne(
    userId: number,
  ): Promise<{ username: string; userId: number; userHandle: string }> {
    return this.getUserFromId(userId);
  }

  private async getUserFromId(userId: number) {
    const {
      data: { username, id, userHandle },
    } = await this.client.get<{
      username: string;
      id: number;
      userHandle: string;
    }>(`/v1/users/${userId}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    return { username, userId: id, userHandle };
  }
}
