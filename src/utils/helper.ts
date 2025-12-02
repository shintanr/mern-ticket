export const getAssetUrl = (path = 'thumbnails') => {
    const baseUrl = process.env.ASSET_BASE_URL ?? ''

    return `${baseUrl}/uploads/${path}`;
}