import React from "react";
import { File } from "tabler-icons-react";
import {
  Button,
  Box,
  Text,
  Divider,
  Stack,
  Pagination,
  Loader,
} from "@mantine/core";
import { useLogin } from "@soul-project/react-soul-utils";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import NavigationBar from "src/components/NavigationBar";
import Page from "src/components/Page";
import usePagination from "src/hooks/usePagination";
import { getAPIurl } from "src/utils";
import NameHeader from "./UserPosts/NameHeader";

export default function UserPosts() {
  let { id: userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { login, isLoggingIn, logout, userCredentials } = useLogin({
    platformId: 2,
    callback: "http://localhost:3000",
  });
  const { data } = useQuery(
    [`${getAPIurl()}/api/posts/users`, userId],
    async () => {
      const { data } = await axios.get<{
        posts: { cid: string; title: string }[];
        totalCount: number;
      }>(`${getAPIurl()}/api/posts/users/${userId}`, {
        params: { page: 1, numItemsPerPage: 10 },
      });
      return data;
    },
    { enabled: !!userId }
  );

  const { data: userData } = useQuery(
    [`${getAPIurl()}/api/users/`, userId],
    async () => {
      const { data } = await axios.get<{ username: string }>(
        `${getAPIurl()}/api/users/${userId}`
      );
      return data;
    },
    { enabled: !!userId }
  );

  // TODO: Handle case for when userId does not exist and api returns not found

  const { page, setPage, totalPages } = usePagination(
    data?.totalCount || 0,
    searchParams,
    setSearchParams
  );

  return (
    <Page>
      <NavigationBar
        username={userCredentials?.username}
        onLogin={login}
        onLogout={logout}
        isLoggingIn={isLoggingIn}
        primaryButton={
          <Button component="a" href="/new" rightIcon={<File />}>
            New Article
          </Button>
        }
      />
      <Box
        sx={() => ({
          maxWidth: "800px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        })}
      >
        <NameHeader username={userData?.username} />
        {/* TODO: Abstract the page out into components */}
        {data ? (
          <Box sx={() => ({ marginTop: "40px" })}>
            <Stack>
              {data.posts.map((post) => (
                <Box key={post.cid} component="a" href="/">
                  <Text color="white" weight="bold">
                    {post.title}
                  </Text>
                  <Text color="white">This is a cool description</Text>
                  <Divider my="sm" />
                </Box>
              ))}
            </Stack>
            {totalPages > 1 && (
              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                sx={() => ({ marginTop: "30px" })}
              />
            )}
          </Box>
        ) : (
          <Box
            sx={() => ({
              width: "100%",
              textAlign: "center",
              padding: "50px",
            })}
          >
            <Loader />
          </Box>
        )}
      </Box>
    </Page>
  );
}
