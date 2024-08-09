import axios from "axios";

const PostRequest = axios.create({
  baseURL: "http://ymp.zulfi.site",
});

export default PostRequest;
