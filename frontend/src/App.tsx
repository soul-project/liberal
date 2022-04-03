import React from "react";
import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import New from "./pages/New";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/new" element={<New />} />
      <Route path="/users/:id/posts" element={<UserPosts />} />
    </Routes>
  );
}

export default App;
