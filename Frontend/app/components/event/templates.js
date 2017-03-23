export const blankEvent = {
  _id: null,
  title: "",
  subtitle: "",
  type: "tournament",
  description: "",
  localimg: "",
  extlink: "",
  start: new Date()
};

export const blankRound = {
  _id: null,
  name: "",
  prev: null,
  next: null,
  tables: [],
  players: [],
  start: new Date()
};
