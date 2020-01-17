
export const getRepoENSName = (repo: any) => `${repo.name.toLowerCase()}.${repo.owner.login.toLowerCase()}.qqq.eth`;

export const getDeployedURL = (user: TUser, repo: any) => `http://${repo.name.toLowerCase().replace(/[.]/g, '-')}.${user.login.toLowerCase()}.qqq.poseidon.work`;
