import { SearchParameters } from '../../search/search-parameters.model';

export class UnityGlobalVariables {

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

    startPrimaryControllerActivity: (activityName: string) => void;

    startSecondaryControllerActivity: (activityName: string) => void;

    //#endregion

    //#region Functions registered by UnityBrowserSearchFunctions.cs

    searchFunctionsReady = false;

    getFacetInfo: (requestId: string) => void;

    search: (searchParams: SearchParameters, requestId: string) => void;

    //#endregion

}
