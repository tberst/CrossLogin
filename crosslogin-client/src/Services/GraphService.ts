// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet1>

var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken: string) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done: any) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client
    .api('/me')
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}
// </graphServiceSnippet1>
