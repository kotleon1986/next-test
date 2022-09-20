export type Playlist = {
    id: string;
    name: string;
    tracks: Track[];
}

export type Track = {
    _id: string;
    title: string;
    url: string;
    artist?: string;
    album?: string;
}
