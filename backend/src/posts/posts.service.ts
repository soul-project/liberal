import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import * as FormStreamData from 'form-data';
import { ulid } from 'ulid';

import { HTMLTemplate } from './templates/template';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Post } from './types';

const API_BASE_URL = 'https://api.soul-network.com';

@Injectable()
export class PostsService {
  client: AxiosInstance;
  db: FirebaseFirestore.Firestore;

  constructor(private readonly firebaseService: FirebaseService) {
    this.client = axios.create({ baseURL: API_BASE_URL });
    this.db = this.firebaseService.getFirestoreClient();
    axiosRetry(this.client, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  async postNewArticle({
    token,
    title,
    content,
  }: {
    token: string;
    title: string;
    content: string;
  }): Promise<{ cid: string }> {
    const { userId } = await this.getUserCredentialsFromToken(token);
    const folderULID = ulid();

    const formData = new FormStreamData();
    formData.append(
      'file',
      HTMLTemplate({
        content: content,
        title: title,
      }),
      {
        filename: encodeURIComponent(`${folderULID}/index.html`),
      },
    );

    const cids = await this.addToIPFS(formData);
    const folderCid = cids[cids.length - 1].Hash;
    await this.addToFirestore({
      userId,
      cid: folderCid,
      title,
      docId: folderULID,
    });

    return { cid: folderCid };
  }

  async getPostsForUser({
    userId,
    page,
    numItemsPerPage,
  }: {
    userId: number;
    page: number;
    numItemsPerPage: number;
  }): Promise<{ posts: Post[]; totalCount: number }> {
    const query = this.db
      .collection('users')
      .doc(String(userId))
      .collection('posts')
      .orderBy('docId', 'desc');

    const totalCount = (await query.get()).size;
    const firebaseDocs = await query
      .limit(numItemsPerPage)
      .offset((page - 1) * numItemsPerPage)
      .get();

    const posts = firebaseDocs.docs.map<Post>((doc) => doc.data() as Post);

    return {
      posts,
      totalCount,
    };
  }

  private async getUserCredentialsFromToken(token: string) {
    const {
      data: { username, id },
    } = await this.client.get<{
      username: string;
      id: number;
    }>('/v1/users/me', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { username, userId: id };
  }

  private async addToIPFS(formData: FormStreamData) {
    const response = (
      await this.client.post<string>(
        `http://${process.env.IPFS_HOSTNAME}:${process.env.IPFS_PORT}/api/v0/add`,
        formData,
        {
          headers: { ...formData.getHeaders() },
          params: { pin: true },
        },
      )
    ).data;

    const cids = response
      .replace(/\n$/, '') // Remove trailing newline
      .split('\n') // Split into lines
      .map<{ Hash: string }>((data) => JSON.parse(data)); // Parse each line

    return cids;
  }

  private async addToFirestore({
    userId,
    cid,
    title,
    docId,
  }: {
    userId: number;
    cid: string;
    title: string;
    docId: string;
  }) {
    const data = { title, cid, docId };
    // add to user posts
    await this.db
      .collection('users')
      .doc(String(userId))
      .collection('posts')
      .doc(docId)
      .set(data);

    // add to global posts
    await this.db.collection('posts').doc(docId).set(data);
  }
}
