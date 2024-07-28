import { Component, ElementRef, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostsRowsService } from '../posts-rows.service'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  items = [
    {
      title: 'Build a Package from APT repository and Create a Patch',
      page: 'build_from_source_with_apt',
      category: 'Software',
    },
    {
      title: 'Build and Test Parabola GNU/Linux-libre',
      page: 'build_test_parabola',
      category: 'Operating Systems',
    },
    {
      title: 'Installing GNU Boot on ASUS P5Q Maiboard',
      page: 'gnuboot_asus_p5q',
      category: 'Hardware',
    },
    {
      title: 'Parabola GNU/Linux-libre (x86_64) Installation',
      page: 'install_parabola',
      category: 'Operating Systems',
    },
    {
      title: 'Kanboard Installation in a Pacman-Based Linux Distribution',
      page: 'kanboard_installation',
      category: 'Software',
    },
    {
      title: 'Arch Linux Installation',
      page: 'install_arch_linux',
      category: 'Operating Systems',
    },
  ].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private postsService: PostsRowsService,
  ) { }

  ngOnInit() {
    let search: HTMLInputElement = <HTMLInputElement>document.getElementById("search");
    let clearSearch: HTMLButtonElement = <HTMLButtonElement>document.getElementById("clear-search")

    search?.addEventListener("input", () => {
      const searchText = search.value.toLowerCase().trim().normalize('NFD').replace(/\p{Diacritic}/gu, "");
      const searchTerms = searchText.split(" ");
      const hasFilter = searchText.length > 0;

      this.postsService.getRows().forEach(post => {
	const searchString = post?.textContent?.toLowerCase().trim().normalize('NFD').replace(/\p{Diacritic}/gu, "");
	const isMatch = searchTerms.every(term => searchString?.includes(term));

	post.classList.toggle("hidden", !isMatch);
      })
    });

    clearSearch?.addEventListener("click", () => {
      if (search != undefined)
	search.value = "";
      
      this.postsService.getRows().forEach(post => {
	post.classList.toggle("hidden", false);
      })
    });
  }

  chooseBadgeColor(category: String) {
    if (category == 'Hardware')
      return 'grey';
    else if (category == 'Operating Systems')
      return 'blue';
    else if (category == 'Software')
      return 'orange';
    else return 'black';
  }
}
