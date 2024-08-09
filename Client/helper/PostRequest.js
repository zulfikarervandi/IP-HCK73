import axios from "axios";

const PostRequest = axios.create({
  baseURL: "http://localhost:3000",
});

export default PostRequest;
