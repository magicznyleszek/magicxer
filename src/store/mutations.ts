export const mutations = {
  setBeginnings(state: IState, payload: string[]): void {
    state.beginnings = payload;
  },
  setEndings(state: IState, payload: string[]): void {
    state.endings = payload;
  }
};
