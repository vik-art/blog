import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/components/interfaces';
import { PostService } from 'src/app/shared/components/post.service';
import { AlertService } from '../shared/services/alert-service.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub!: Subscription;
  dSub!: Subscription;
  searchStr: string = "";

  constructor(
    private postService: PostService,
    private alert: AlertService,
  
  ) { }

  ngOnInit(): void {
   this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
        this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
removePost(id: string) {
 this.dSub = this.postService.remove(id).subscribe(() => {
   this.posts = this.posts.filter(post => post.id !== id);
   this.alert.danger('The post has been removed')
  })
}
}
