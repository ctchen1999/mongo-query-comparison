export interface ApiResponse {
    success: boolean;
    extra: any;
}

export interface Callback {
    (err:any, response:any): void
}

export interface ResCallback {
    (err: any, response: ApiResponse): void
}