import { BehaviorSubject } from 'rxjs';
import { ControllerModalActivity } from '../../controller-modal-activity.type';
import { SearchParameters } from '../../search/search-parameters.model';
import { TerrainType } from '../../terrain/terrain-type.type';
import { TerrainModelLayer } from '../../terrain/layer/terrain-model-layer.model';

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

    userInterfaceFunctionsReady = false;

    startPrimaryControllerActivity: (activityName: ControllerModalActivity) => void;

    startSecondaryControllerActivity: (activityName: ControllerModalActivity) => void;

    setMainModalVisiblity: (visible: boolean) => void;

    //#endregion

    //#region Functions registered by UnityTerrainModelFunctions.cs

    terrainFunctionsReady = false;

    readonly onTerrainTypeChange: BehaviorSubject<TerrainType> = new BehaviorSubject<TerrainType>('globe');

    showGlobeModel: () => void;

    navigateToCoordinate: (bbox: string) => void;

    highlightBoundingBoxOnGlobe: (bbox: string) => void;

    createLocalTerrainFromBookmark: (bookmarkJson: string) => void;

    getCurrentViewSettings: (requestId: string) => void;

    setHeightExaggeration: (value: number) => void;

    setTexturesVisiblity: (visible: boolean) => void;

    setCoordinateIndicatorsVisibility: (visible: boolean) => void;

    setLocationNamesVisibility: (visible: boolean) => void;

    hideControlPanel: () => void;

    //#endregion

    //#region Functions registered by UnityTerrainModelFunctions.cs

    layerFunctionsReady = false;

    readonly onLayersUpdated: BehaviorSubject<TerrainModelLayer[]> = new BehaviorSubject<TerrainModelLayer[]>(null);

    addLayer: (uuid: string, index?: number) => void;

    updateLayer: (layerChangeJson: string) => void;

    moveLayer: (from: number, to: number) => void;

    removeLayer: (index: number) => void;

    getCurrentLayers: (requestId: string) => void;

    //#endregion

    //#region Functions registered by UnityBrowserSearchFunctions.cs

    searchFunctionsReady = false;

    readonly onSearchListActiveIndexChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    updateSearchListActiveIndex: (index: number) => void;

    getFacetInfo: (requestId: string) => void;

    getBookmarks: (requestId: string) => void;

    getDatasets: (requestId: string) => void;

    getNomenclatures: (requestId: string) => void;

    getProducts: (requestId: string) => void;

    getRasters: (requestId: string) => void;

    search: (searchParams: SearchParameters, requestId: string) => void;

    //#endregion

    //#region Functions registered by UnityBrowserToolsFunctions.cs

    toolsFunctionsReady = false;

    getDistance: (points: string, requestId: string) => void;

    getHeightProfile: (points: string, sampleCount: number, requestId: string) => void;

    //#endregion

}
