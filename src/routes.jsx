import App from "./components/App";
import PostList from "./components/PostList";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Post from "./components/Post";
import Create from "./components/Create";
import User from "./components/User";

const routes = [
  {
    path: "/",
    Component: App,
    children: [
      { path: "/", Component: PostList },
      { path: "signup", Component: SignUp },
      { path: "login", Component: Login },
      { path: "posts/:postId", Component: Post },
      { path: "create", Component: Create },
      { path: "users/:userId", Component: User },
    ],
  },
];

export default routes;
