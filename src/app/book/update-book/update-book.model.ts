export class UpdateBook {
    public title: string;
    public description: string;
    public author: string;
    public imageSource: string | undefined;
    public genre: string;
    public status: string;

    constructor(title: string, description: string, author: string, imageSource: string, genre: string, status: string) {
        this.title = title ? title : '';
        this.description = description ? description : '';
        this.author = author ? author : '';
        this.imageSource = imageSource ? imageSource : '';
        this.status = status ? status : '';
        this.genre = genre ? genre : '';
    }
}