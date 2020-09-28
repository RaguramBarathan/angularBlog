import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/app/blog/blog.service';
import { BlogModel, BlogType } from '../../blog/blog.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {
  //variables
  public routeSubs: Subscription = null;
  public newBlog: BlogType = new BlogModel();

  userData: Subscription = null;
  public loggedInUid: string = null;
  // flags
  editMode: boolean = false;
  //View Usage
  public id: number;
  routePath: string;
  public editPath = "edit/:id";
  @ViewChild('f') blogForm: NgForm;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    // console.log("init" + this.newBlog);
  
    //subscribe for route change
    this.routeSubs = this.route.params.subscribe(
      (params: Params) => {
        this.routePath = this.route.snapshot.routeConfig.path;
        //  this.editMode = false;
        if (this.routePath === this.editPath) {
          this.editMode = true;
        }
        this.onRouteMactched(params);
        // console.log("EditMode", this.editMode);
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

  onRouteMactched(params) {
    this.id = +params['id']; // casting to number by using +

    if (this.editMode) {
      this.newBlog = this.blogService.getBlog(this.id);
    }


  }

  onClear() {
    this.blogForm.reset();
  }
  onCancel() {
    this.navigateToPost();
  }
  navigateToPost() {
    this.router.navigate(['/post', this.id]);
  }
  onSubmit() {
    console.log("submit" + this.newBlog);
    if (this.editMode) {

      const { key, ...editedBlog } = this.newBlog;
      //console.log(key, editedBlog);
      this.blogService.updateBlog(key, editedBlog).then(
        () => {
        //  console.log("updated");
          this.navigateToPost();
        }
      )

    } else {
      this.newBlog.id = this.loggedInUid;
      this.blogService.createBlog(this.newBlog).then(() => {
        // console.log("created");
        this.onClear();
        this.router.navigate(['../../']);
      })
    }
  }
  ngOnDestroy() {
    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }
    if(this.userData){
      this.userData.unsubscribe();
    }
   
  }
}
