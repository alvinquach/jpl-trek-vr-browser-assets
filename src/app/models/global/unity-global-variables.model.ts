export class UnityGlobalVariables {

    // Note that Unity registers the functions after the onload
    // event is fired, which takes place after the components are
    // initialized (even after ngAfterViewInit), so they are not
    // immediately available.

    readonly functionsMap = {};

    webFunctionsReady = false;

    //#region Standard functions that should be registered by Unity

    registerFunctionsFor: (name: string) => void;

    unregisterFunctionsFor: (name: string) => void;

    getRequest: (uri: string, requestId: string) => void;

    postRequest: (uri: string, body: string, requestId: string) => void;

    //#endregion

}
