export const tutorReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "TUTORS_LOADED_SUCCESS":
      return {
        ...state,
        tutors: payload,
        tutorsLoading: false,
      };
    default:
      return state;
  }
};
