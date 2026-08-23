import App from "./components/App";
import PostList from "./components/PostList";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Post from "./components/Post";

const routes = [
  {
    path: "/",
    Component: App,
    children: [
      { path: "/", Component: PostList },
      { path: "signup", Component: SignUp },
      { path: "login", Component: Login },
      { path: "posts/:postId", Component: Post },
    ],
  },
];

export default routes;
