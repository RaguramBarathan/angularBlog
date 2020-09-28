import { ConstantValues } from '../constants'

export interface NextEpisodes {
    title :string;
    createdBy : string;
    id: string;
    index : number;
}
export interface FeaturedEpisodes {
    title :string;
    author: string;
    publishDate:Date;
    
}
export interface BlogType {
    key ? : string;
    id: string;
   title: string;
   subtitle: string;
   imagePath: string;
   tooltip: string;
   createdBy: string;
   inspiredBy: string;
   createdOn: Date;
   episode: string;
   readMins: String;
   blogContent: string;
   videoID : string;
   petName : string;
   petLine : string;
}

export class BlogModel {
    public key : string;
    public id: string;
    public title: string;
    public subtitle: string;
    public imagePath: string;
    public tooltip: string;
    public createdBy: string;
    public inspiredBy: string;
    public createdOn: Date;
    public episode: string;
    public readMins: String;
    public blogContent: string;
    public videoID : string;
    public petName : string;
    public petLine : string;
    constructor(title?: string, subtitle?:string) {
        
        this.id = "";
        this.title = title;
        this.subtitle = subtitle;
        this.imagePath = ConstantValues.logoImagePath; //imagePath
        this.tooltip = "";
        this.createdBy = "";
        this.inspiredBy = "";
        this.createdOn = new Date();
        this.episode = "1";
        this.readMins = "3";
        this.blogContent = ""
        this.videoID = "";
        this.petName = "";
        this.petLine = "";
    }
}