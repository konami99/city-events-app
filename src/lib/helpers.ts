export type FileType = File & {
    preview: string;
}

export interface PageProps {
    params: {
        slug: string,
    }
}