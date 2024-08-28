import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/shared/container/container.component';
import { BlogPostModel } from '../../../models/blog-post.model';
import { mockBlogPosts } from '../../../mockData/mock-blog-posts';
import { ActivatedRoute } from '@angular/router';
import { TagLabelComponent } from '../../components/shared/tag-label/tag-label.component';
import { SectionAnimationService } from '../../../services/section-animation.service';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [
    ContainerComponent,
    TagLabelComponent
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent implements OnInit, AfterViewInit {
  postId!: number;
  post!: BlogPostModel;
  posts: BlogPostModel[] = mockBlogPosts;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private sectionAnimationService: SectionAnimationService
  ) {}

  ngAfterViewInit() {
    const elements = this.sectionAnimationService.getElementsByClass(this.el, 'animation');
    this.sectionAnimationService.observeElements(elements);
  }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    this.post = this.posts.find(p => p.id === this.postId)!;
  }
}
