export const IMAGES_PATH = '/images/'
export const BACKGROUNDS_IMAGES_PATH = IMAGES_PATH + 'backgrounds/'
export const LOGO_IMAGES_PATH = IMAGES_PATH + 'logo/'
export const SLIDER_IMAGES_PATH = IMAGES_PATH + 'home-slider/'
export const SERVICES_IMAGES_PATH = IMAGES_PATH + 'services/'
export const GALLERY_IMAGES_PATH = IMAGES_PATH + 'gallery/'
export const ICONS_PATH = IMAGES_PATH + 'icons/'
export const ARTICLES_IMAGES_PATH = IMAGES_PATH + 'articles/'
export const ARTICLES_CATEGORIES_IMAGES_PATH = ARTICLES_IMAGES_PATH  + 'categories/'
export const ABOUT_IMAGES_PATH = IMAGES_PATH + 'about/'
// it will be changed later
export const openingImages = (slug: string, index: string) => GALLERY_IMAGES_PATH + `opening/${slug} (${index}).jpg`
export const careerkImages = (slug: string, index: string) => GALLERY_IMAGES_PATH + `careerk/${slug}-${index}.jpg`
export const achieveImages = (index: string) => GALLERY_IMAGES_PATH + `achieve/${index}.jpg`
