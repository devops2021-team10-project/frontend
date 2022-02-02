import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";

import {FormControl, FormGroup } from "@angular/forms";
import {CreatePost} from "../../models/create-post.model";

import {PostService} from "../../services/post.service";
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  description: string = "";
  imageData: any;

  constructor(
    private postService: PostService,
    private tService: ToastrService
  ) {}

  ngOnInit(): void {
  }

  onSelectFile(event: any) {
    this.imageData = event.target.files[0]
    const mimeType = this.imageData.type
    if (mimeType.match(/image\/*/) == null) {
      this.tService.warning("This file type is not supported. Please upload in image format.", "Upload error");
      this.imageData = null;
      return;
    }
  }

  onCreate(): void {
    if (this.imageData === null || this.imageData === undefined) {
      this.tService.warning("No image selected", "Upload error");
      return;
    }


    console.log("description: ");
    console.log(this.description);

    let hashtags = this.description.match(/#[_a-zA-Z][_a-zA-Z0-9]{0,100}/gm);
    console.log("hashtags: ");
    console.log(hashtags)
    // @ts-ignore
    let createData = new CreatePost(hashtags, this.description);
    this.postService
      .create(createData, this.imageData)
      .subscribe(
        (response: Post) => {
          this.tService.success("New post successfully created.");
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not create post');
        }
      )
  }

}
