import { Injectable } from '@angular/core';

import { BlogModel, NextEpisodes, FeaturedEpisodes } from './blog.model';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';



//firestore
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class BlogService {

    private blogs: BlogModel[] = [];
    private blogsLength: number;
    private nextEpisodes: NextEpisodes[] = [];
    private featuredEpisodes: FeaturedEpisodes[] = [];fireb


    // subjects
    blogsUpdated = new Subject<BlogModel[]>();

    private dbPath = '/blogs';
    blogref: AngularFireList<BlogModel> = null;

    constructor(private db: AngularFireDatabase
      
    ) {
       
        this.blogref = db.list(this.dbPath);

    }


    getBlogs() {
        this.getAllBlogs();
        this.blogsLength = this.blogs.length;
        return this.blogs.slice();
    }
    getBlog(index: number) {

        return this.blogs[index];

    }

    getNextEpisodes(currentIndex: number) {
        //find the index
        this.nextEpisodes = [];
        let nextEpisodeIndex = currentIndex + 1
        if (nextEpisodeIndex < this.blogsLength) {
            for (let i = nextEpisodeIndex; i < this.blogsLength; i++) {
                this.nextEpisodes.push({
                    id: this.blogs[i].id,
                    createdBy: this.blogs[i].createdBy,
                    title: this.blogs[i].title,

                    index: i
                });
                if (this.nextEpisodes.length == 2) {
                    break;
                }
            }
        }
        return this.nextEpisodes;
    }

    getFeaturedEpisodes() {
        this.featuredEpisodes = [];
        this.featuredEpisodes.push(
            {
                title: "Need to Think",
                publishDate: new Date(),
                author: "Sujatha"
            },
            {
                title: "Yosikanum",
                publishDate: new Date(),
                author: "Radha"
            }
        );
        return this.featuredEpisodes;

    }

    getAllBlogs() {
        // get all the blogs
        this.blogref.snapshotChanges()
            .pipe(
                catchError(
                    val => { return throwError(val); }
                ),
                map(changes =>
                    changes.map(c =>
                        ({ key: c.payload.key, ...c.payload.val() })
                    )
                )
            )
            .subscribe(data => {
                this.blogs = data;
                this.blogsUpdated.next(this.blogs);
                //console.log(data);
            }, err => {
                console.log("There is an Error", err);
            }
            )
            ;
    }

    createBlog(value: any): any {
        return this.blogref.push(value);
    }
    updateBlog(key: string, value: any): Promise<void> {
        return this.blogref.update(key, value);
    }
}