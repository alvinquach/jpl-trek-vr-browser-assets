export class MathUtils {

    static clamp(value: number, min: number, max = Number.MAX_VALUE) {
        return value < min ? min : value > max ? max : value;
    }

}