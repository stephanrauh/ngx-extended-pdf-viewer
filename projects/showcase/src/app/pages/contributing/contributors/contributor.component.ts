import { Component, input } from '@angular/core';
import { Contributor } from './contributor.type';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'pvs-contributor',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <img [ngSrc]="contributor().avatar_url" alt="Contributors profile picture" [width]="avatarSize" [height]="avatarSize" class="rounded-full" />
    <a [href]="contributor().html_url">{{ contributor().login }}</a>
  `,
  host: {
    class: 'flex gap-4 items-center',
  },
})
export class ContributorComponent {
  contributor = input.required<Contributor>();
  avatarSize = 40;
}
