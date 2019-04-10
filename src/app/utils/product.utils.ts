export class ProductUtils {

    static parseThumbnailUrl(thumbnailUrl: string): string {
        if (!thumbnailUrl || thumbnailUrl === 'n/a') {
            return null;
        } else if (thumbnailUrl.endsWith('-')) {
            return `${thumbnailUrl}200.png`;
        }
        return thumbnailUrl;
    }

}
