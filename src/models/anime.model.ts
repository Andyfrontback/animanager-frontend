//anime.model.ts
export interface Anime {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  score: number;
  type: string;
  airing: boolean;
  aired: {
    prop: {
      from: {
        year: string; // Toca este pq los animes que sacan todo de una no les ponen anime.year
      };
    };
  };
}
