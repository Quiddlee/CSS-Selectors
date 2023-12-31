import '../../sass/main.scss';
import * as app from '../views/appView';
import * as table from '../views/tableView/tableView';
import * as cssEditor from '../views/cssEditorView';
import * as htmlEditor from '../views/htmlEditorView';
import * as sidePanel from '../views/sidePanelView';
import * as model from '../model/model';
import { addHover, addHoverForChildren, removeHover } from '../helpers';
import controlTableIn from './controlTable/controlTableIn';
import controlHtmlEditorIn from './controlHtmlEditor/controlHtmlEditorIn';
import controlCssEditor from './controlCssEditor';
import controlSidePanelLevels from './controllSidePanel/controlSidePanelLevels';
import controlSidePanelReset from './controllSidePanel/controlSidePanelReset';
import controlTableOut from './controlTable/controlTableOut';
import controlHtmlEditorOut from './controlHtmlEditor/controlHtmlEditorOut';
import controlTableHint from './controlTable/controlTableHint';
import LEVELS from '../model/levels';
import controlTableMobileNavNext from './controlTable/controlTableMobileNavNext';
import controlTableMobileNavPrev from './controlTable/controlTableMobileNavPrev';

export const addHoverTableAndMarkup = (
  tableElement: HTMLElement,
  markup: HTMLElement,
) => {
  addHover(tableElement, markup);
  addHoverForChildren([...markup.children]);
};

export const removeHoverFromTableAndMarkup = () => {
  [table.parsedLevelElements, htmlEditor.parsedLevelMarkup].forEach((parent) =>
    parent.forEach(removeHover),
  );
};

export const renderLevel = () => {
  cssEditor.render();
  htmlEditor.render(model.state.levelData.elements);
  table.render({
    levelData: model.state.levelData,
    currLevel: model.state.currLevel,
    completedLevels: model.state.completedLevels,
  });
  sidePanel.render({
    levelTitles: LEVELS,
    numOfLevels: model.state.numOfLevels,
    currLevel: model.state.currLevel,
    completedLevels: model.state.completedLevels,
  });
};

const init = () => {
  model.getState();
  model.setLevel(model.state.currLevel);

  app.createApp();

  const tableWrapper = table.init();
  const cssEditorWrapper = cssEditor.init();
  const htmlEditorWrapper = htmlEditor.init();
  const sidePanelWrapper = sidePanel.init();

  app.element.append(
    tableWrapper,
    cssEditorWrapper,
    htmlEditorWrapper,
    sidePanelWrapper,
  );

  renderLevel();

  table.addHoverHandlers(controlTableIn, controlTableOut);
  table.addHintHandler(controlTableHint);
  table.addMobileNavigationHandlers(
    controlTableMobileNavNext,
    controlTableMobileNavPrev,
  );
  htmlEditor.addHoverHandlers(controlHtmlEditorIn, controlHtmlEditorOut);
  cssEditor.addHandler(controlCssEditor);
  sidePanel.addResetProgressHandler(controlSidePanelReset);
  sidePanel.addChooseLevelsHandler(controlSidePanelLevels);
};
init();
