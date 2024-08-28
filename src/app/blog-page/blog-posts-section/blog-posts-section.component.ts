import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/shared/container/container.component';
import { TagLabelComponent } from '../../components/shared/tag-label/tag-label.component';
import { BlogPostModel} from '../../../models/blog-post.model';
import { mockBlogPosts } from '../../../mockData/mock-blog-posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-posts-section',
  standalone: true,
  imports: [
    ContainerComponent,
    TagLabelComponent
  ],
  templateUrl: './blog-posts-section.component.html',
  styleUrl: './blog-posts-section.component.scss'
})
export class BlogPostsSectionComponent {
  posts: BlogPostModel[] = mockBlogPosts.slice(2, mockBlogPosts.length+1);

  constructor(private router: Router) {
  }

  navigateToCourse(postId: number): void {
    this.router.navigate(['blog/', postId]);
  }
}
