import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/components/interfaces';
import { PostService } from 'src/app/shared/components/post.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts$!: Observable<Post[]>

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
   this.posts$ = this.postService.getAll()
  }

}
