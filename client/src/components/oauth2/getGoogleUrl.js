const getGoogleUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/auth";

  const options = {
    redirect_uri: "http://localhost:5000/api/auth/google/oauth2",
    // redirect_uri: "https://www.laca.fun/api/auth/google/oauth2",
    client_id:
      "815659088837-qpa8hmtalgl2kn8qjcrcdvvefbkmcle5.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    include_granted_scopes: true,
  };

  //console.log(options);

  const qs = new URLSearchParams(options);

  //console.log(qs.toString());

  return `${rootUrl}?${qs.toString()}`;
};

export default getGoogleUrl;
