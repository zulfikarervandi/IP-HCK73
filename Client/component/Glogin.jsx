import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Glogin() {
    const navigate = useNavigate()
  useEffect(() => {
    google.accounts.id.initialize({
      // fill this with your own client ID
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      // callback function to handle the response
      callback: async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        const { data } = await axios.post("http://localhost:3000/auth/google", {
          googleToken: response.credential,
        });
        console.log(data,"???");
  

        localStorage.setItem("access_token", data.access_token);

        // navigate to the home page or do magic stuff
        navigate('/')
      },
    });
    google.accounts.id.renderButton(
      // HTML element ID where the button will be rendered
      // this should be existed in the DOM
      document.getElementById("buttonDiv"),
      // customization attributes
      { theme: "outline", size: "large" }
    );
    // to display the One Tap dialog, or comment to remove the dialog
    google.accounts.id.prompt();
  }, []);

  return <div id="buttonDiv"></div>;
}

export default Glogin;
