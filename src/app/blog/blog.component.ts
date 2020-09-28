import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogModel } from './blog.model';
import { BlogService } from './blog.service';
import { ConstantValues } from '../constants';
import { AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit , OnDestroy {

  blogSubs: Subscription = null;
  userData: Subscription = null;
  public blogs: BlogModel[] = [];
  public loggedInUid:string = null;

  localIcon : string = ConstantValues.logoImagePath;

  constructor(
    private blogService: BlogService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.blogs = this.blogService.getBlogs();
    //console.log(this.blogs);
    //Blog Subscription
    this.blogSubs = this.blogService.blogsUpdated.subscribe(
      blogs => {
        this.blogs = blogs;
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

  ngOnDestroy (){
    if(this.blogSubs){
      this.blogSubs.unsubscribe();
    }
    if(this.userData){
      this.userData.unsubscribe();
    }
  }

}
