
import themes from '../../utils/ThemeList';

const setSelectedThemeReducer = (state = themes.find(each => each.keyFlag === 'dark'), action) => {
  switch (action.type) {
  case "SELECTED_THEME":
    return action.payload;
  default:
    return state;
  }
};

export default setSelectedThemeReducer;
