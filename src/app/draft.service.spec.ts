import { TestBed } from '@angular/core/testing';

import { DraftService } from './draft.service';

describe('DraftService', () => {
  let service: DraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should split draft post into blocks', () => {
    const draftPost = `
      blog
      Test Draft Post
      ---
      text
      Hello world! my name is david.
      ---
      text
      My other name is bloodisblue or dawguy.
      ---
      image
      abcdef.png
      ---
      indent
      This is what an indented div looks like.
      ---
      code-clojure
      (prn (str "I did" (inc 2) "lines here!"))
      ---
      code-typescript
      console.out.println("Yoyo");
      console.out.println("ABC");
      ---
      text
      Ending with some text.
      ---
    `;
    const post = service.getDraftPost(draftPost);
    expect(post.title).toEqual('Test Draft Post');
    expect(post.type).toEqual('blog');
    expect(post.content[0].type).toEqual('text');
    expect(post.content[2].type).toEqual('image');
    expect(post.content[5].lines[1]).toEqual('console.out.println("ABC");')
  });
});
