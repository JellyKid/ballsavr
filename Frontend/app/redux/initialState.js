export const INITIAL_STATE = {
  authenticated: null,
  admin : false,
  user: {},
  users: [],
  events: [],
  rounds: [],
  currentTables: [],
  message: "",
  messageBox: {
    visible: [],
    log: []
  },
  site: {
    org_name: "",
    url: ""
  }
};
