import createPersistedState from 'use-persisted-state';

export const useUserState = createPersistedState('user');
export const useTokenState = createPersistedState('token');
