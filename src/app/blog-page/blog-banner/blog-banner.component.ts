import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/shared/container/container.component';
import { BlogPostModel } from '../../../models/blog-post.model';
import { mockBlogPosts } from '../../../mockData/mock-blog-posts';
import { TagLabelComponent } from '../../components/shared/tag-label/tag-label.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-banner',
  standalone: true,
  imports: [
    ContainerComponent,
    TagLabelComponent
  ],
  templateUrl: './blog-banner.component.html',
  styleUrl: './blog-banner.component.scss'
})
export class BlogBannerComponent {
  posts: BlogPostModel[] = mockBlogPosts.slice(0, 2);

  constructor(private router: Router) {
  }

  navigateToCourse(postId: number): void {
    this.router.navigate(['blog/', postId]);
  }
}
