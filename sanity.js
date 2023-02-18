import {
    createCurrentUserHook,
    createClient,
} from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
    dataset:"production",
    projectId:"7v0zj2tt",
    apiVersion:"2023-01-25",
    useCdn: process.env.NODE_ENV === 'production',
}
export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

