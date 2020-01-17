
export const getRepoENSName = (repo: any) => `${repo.name.toLowerCase().replace(/[.]/g, '-')}.${repo.owner.login.toLowerCase()}.qqq.eth`;

export const getDeployedURL = (repo: any) => `http://${repo.name.toLowerCase().replace(/[.]/g, '-')}.${repo.owner.login.toLowerCase()}.qqq.poseidon.work`;
