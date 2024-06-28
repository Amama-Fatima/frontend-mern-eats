import { AppState, Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithNavigateProps = {
  children: React.ReactNode;
};

export default function Auth0ProviderWithNavigate({
  children,
}: Auth0ProviderWithNavigateProps) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  const navigate = useNavigate();

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Auth0 environment variables not set");
  }
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri, audience }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}