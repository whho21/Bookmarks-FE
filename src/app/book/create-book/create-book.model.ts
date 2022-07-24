export class NewBook {
    public title: string;
    public description: string;
    public author: string;
    public genre: string;
    public imageSource:string | undefined;
  
    constructor(title:string, author:string, imageSource:string | undefined, description:string, genre:string) {
      this.title = title ? title : '';
      this.description = description ? description : '';
      this.author = author ? author : '';
      this.genre = genre ? genre : '';
      this.imageSource = imageSource ? imageSource : '';
    }
  }