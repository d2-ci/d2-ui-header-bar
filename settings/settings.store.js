import _extends from 'babel-runtime/helpers/extends';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import { Observable } from 'rxjs/Observable';
import { Store } from '@dhis2/d2-ui-core';
import { appsMenuSource$ } from '../utils/menu-sources';

var headerBarSettingsStore = Store.create();

export function setGrid(grid) {
    headerBarSettingsStore.setState(_Object$assign({}, headerBarSettingsStore.getState() || {}, {
        grid: grid
    }));
}

setGrid({ x: 3, y: 3 });

export default Observable.combineLatest(appsMenuSource$, headerBarSettingsStore, function (appItems, headerBarSettings) {
    return _extends({}, headerBarSettings, {
        gridOptions: [{ x: 3, y: 3 }, { x: 5, y: 4 }, { x: 8, y: 3 }].concat(appItems ? [{ x: Math.ceil(appItems.length / 4), y: 4 }] : [])
    });
});