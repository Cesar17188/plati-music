export interface Song {
  name?: string;
  playing: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  preview_url?: string;
  tracks?: string[];
};
