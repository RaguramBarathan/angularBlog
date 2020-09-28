import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../blog/blog.service';

import { Subscription } from 'rxjs';
//Router
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import { BlogModel , NextEpisodes,FeaturedEpisodes } from '../blog/blog.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  //variables
  public routeSubs: Subscription = null;
  blogSubs: Subscription = null;
  userData: Subscription = null;
  //View Usage
  public id : number;
  public postDetails : BlogModel;
  public nextEpisodes : NextEpisodes[] = [];
  public featuredEpisodes : FeaturedEpisodes[]=[];
  public loggedInUid:string = null;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    
    //test codes
    //console.log("post" + this.blogService.getBlogs());
    //subscribe for route change
    this.routeSubs = this.route.params.subscribe(
      (params: Params) => {
        this.onRouteMactched(params);
      }
    );
    //subscribe for new updates on the Blogs
    this.blogSubs = this.blogService.blogsUpdated.subscribe(
      blogs => {
        this.postDetails = blogs[this.id];
      }
    );

    this.userData  = this.authService.user.subscribe( user=> {
      this.loggedInUid = null;
      if(user){
        this.loggedInUid = user.id;
      }
      
      // console.log(this.loggedInUid);       
     });
  }
  //on Route Match
  onRouteMactched(params) {
    this.id = +params['id']; // casting to number by using +
    //console.log(params);
    this.postDetails = this.blogService.getBlog(this.id);
    //console.log(this.postDetails);

    this.nextEpisodes = this.blogService.getNextEpisodes(this.id);
   // console.log(this.nextEpisodes);
    this.featuredEpisodes = this.blogService.getFeaturedEpisodes();
//console.log(this.featuredEpisodes);

  }

  //Destroy
  ngOnDestroy() {
    if (this.routeSubs) { this.routeSubs.unsubscribe(); }
    if(this.userData){
      this.userData.unsubscribe();
    }
  }
}
