export const customExchangeStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (provided: any) => ({
    ...provided,
    width: "200px",
    border: "0",
    color: "red",
    outline: "none",
    borderBottom: "1px solid black ",
    backgroundColor: "white",
    boxShadow: "none",
    cursor: "pointer",
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (provided: any) => ({
    ...provided,
    color: "gray",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d9dadb", // Set the desired background color on hover
    },
  }),
};

export const customSelectCountryStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (provided: any) => ({
    ...provided,
    cursor: "pointer",
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (provided: any) => ({
    ...provided,
    background: "white",
    color: "gray",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d9dadb", // Set the desired background color on hover
    },
  }),
};
