export default {
  dataSalaryRange(data) {
    console.log(data);
    const quotes = data.match(/"([^"]*)"/g) || [];
    // const salaryRange = quotes.filter((quote) => {
    //     return quote.includes("-").match;
    // });
    return quotes;
  },
  dataJob(data) {
    const regex = /@([^@]+)@/g;
    const matches = data.match(regex);
    const result = matches ? matches.map((match) => match.slice(1, -1)) : [];
    return result;
  },
};
