export class StringUtils {

    static firstCharacterToLower(str: string) {
        if (!str) {
            return str;
        }
        if (str.length === 1) {
            return str.toLowerCase();
        }
        return str.charAt(0).toLowerCase() + str.substring(1);
    }

    static firstCharacterToUpper(str: string) {
        if (!str) {
            return str;
        }
        if (str.length === 1) {
            return str.toUpperCase();
        }
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

}