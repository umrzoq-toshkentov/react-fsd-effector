import { sample } from 'effector';
import { createEvent, createStore } from 'effector';
import { debug } from 'patronum';

export const $files = createStore<{ uri: string }[]>([]);

export const filesUploaded = createEvent<FileList | null>();

sample({
  clock: filesUploaded,
  filter: Boolean,
  fn(files) {
    return Array.from(files).map((file) => ({
      uri: URL.createObjectURL(file),
    }));
  },
  target: $files,
});

debug($files);
