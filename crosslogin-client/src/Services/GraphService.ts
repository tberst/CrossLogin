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
    .select('displayName,mail,mailboxSettings,userPrincipalName,jobTitle')
    .get();

  user.photo = await client.api('/me/photo/$value').responseType(graph.ResponseType.BLOB).get();
  return user;
}


export async function getUserTasks(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const tasks = await client
    .api('/me/planner/tasks')
    .select('id,title,startDateTime,dueDateTime,completedDateTime')
    .get();

  return tasks.value;
}
// </graphServiceSnippet1>

