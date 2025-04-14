export interface Connection {
    event: string;
    figure: string;
    location: string;
    year: string;
    description?: string;
}

export interface SearchResponse {
    summary: string;
    connections: Connection[];
}
