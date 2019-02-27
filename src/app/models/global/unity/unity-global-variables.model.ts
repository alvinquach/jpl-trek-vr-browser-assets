import { SearchParameters } from '../../search/search-parameters.model';
import { ControllerModalActivity } from '../../controller-modal-activity.type';

export class UnityGlobalVariables {

    static get instance(): UnityGlobalVariables {
        return window[UnityGlobalVariables.name];
    }

    // Note that Unity registers the functions after the onload
    // event is fired, which takes place after the components are
    // initialized (even after ngAfterViewInit), so they are not
    // immediately available.

    readonly functionsMap = {};

    registerFunctionsFor: (name: string) => void;

    unregisterFunctionsFor: (name: string) => void;

    //#region Functions registered by UnityBrowserWebFunctions.cs

    webFunctionsReady = false;

    getRequest: (uri: string, requestId: string) => void;

    postRequest: (uri: string, body: string, requestId: string) => void;

    //#endregion

    //#region Functions registered by UnityBrowserControllerFunctions.cs

    controllerFunctionsReady = false;

    startPrimaryControllerActivity: (activityName: ControllerModalActivity) => void;

    startSecondaryControllerActivity: (activityName: ControllerModalActivity) => void;

    //#endregion

    //#region Functions registered by UnityBrowserSearchFunctions.cs

    searchFunctionsReady = false;

    getFacetInfo: (requestId: string) => void;

    getBookmarks: (requestId: string) => void;

    getDatasets: (requestId: string) => void;

    getNomenclature: (requestId: string) => void;

    getProducts: (requestId: string) => void;

    search: (searchParams: SearchParameters, requestId: string) => void;

    //#endregion

}
