export type NSFWType = 'drawings' | 'hentai' | 'neutral' | 'porn' | 'sexy';

export interface PostNSFWResponse {
  predictions: {
    [key in NSFWType]: number;
  };
  top_class: 'neutral';
  nsfw: boolean;
}
