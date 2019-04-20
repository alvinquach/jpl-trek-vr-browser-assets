import { GlobalService } from '../base-global.service';
import { Coordinate } from 'src/app/models/terrain/coordinate.model';

export abstract class ToolsService extends GlobalService {

    abstract getDistance(points: Coordinate[], callback: (res) => void, errorCallback?: (error: any) => void): void;

    abstract getHeightProfile(points: Coordinate[], sampleCount: number,
        callback: (res) => void, errorCallback?: (error: any) => void): void;

    protected _coordinatesToString(points: Coordinate[]): string {
        const pointsArray = points.map(p => [p.y, p.x]);  // For some reason, longitude and latitude are switched.
        return JSON.stringify(pointsArray);
    }

}
