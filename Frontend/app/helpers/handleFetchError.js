export default (err) => {  
  console.error(`Fetch error: ${err.message}`);
  console.error(`Stack: ${err.stack}`);
};
