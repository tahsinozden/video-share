export class ServerVideoModel {
    constructor(public videoId: number, 
                public videoName: string, 
                public videoDescription: string,
                public videoTagIds: string,
                public videoFilePath: string,
                public addedDate: number) {}
}