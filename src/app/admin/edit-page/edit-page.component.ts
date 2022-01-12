import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/components/interfaces';
import { PostService } from 'src/app/shared/components/post.service';
import { AlertService } from '../shared/services/alert-service.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  post!: Post;
  submitted: boolean = false;
  upSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      }))
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    if (this.upSub) {
      this.upSub.unsubscribe()
    }
  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
  this.upSub = this.postService.update({
      ...this.post,
      id: this.post.id,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false;
    })
    this.alert.success('The post has been updated')
}
}
