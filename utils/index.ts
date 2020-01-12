
export const getRepoENSName = (user: TUser, repo: any) => `${repo.name.toLowerCase()}.${user.login.toLowerCase()}.qqq.eth`;

export const getDeployedURL = (user: TUser, repo: any) => `http://${repo.name.toLowerCase()}.${user.login.toLowerCase()}.qqq.poseidon.work`;
