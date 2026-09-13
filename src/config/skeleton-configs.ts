export const skeletonConfigs = {
  about: {
    sections: [
      {
        type: 'content',
        class: 'px-2',
        columns: [
          {
            id: 'main-content',
            cols: 12,
            md: 7,
            items: [
              { skeletonType: 'heading', class: 'mb-4', width: 400 },
              { skeletonType: 'sentences', class: 'mb-4', width: 400 },
              { skeletonType: 'paragraph', class: 'my-5' },
              { skeletonType: 'paragraph', class: 'my-5' },
            ],
          },
        ],
      },
      {
        type: 'header',
        skeletonType: 'heading',
        class: 'mt-10 mb-6',
        width: 300,
      },
      {
        type: 'grid',
        items: 4,
        cols: 12,
        sm: 6,
        skeletonType: 'card',
        class: 'my-3',
        itemClass: 'ma-2 fill-height',
      },
    ],
  },
  projects: {
    sections: [
      {
        type: 'header',
        skeletonType: 'heading',
        class: 'mb-6',
      },
      {
        type: 'grid',
        items: 6,
        cols: 12,
        md: 4,
        skeletonType: 'card-avatar, article, actions',
        itemClass: 'mb-6',
      },
    ],
  },
  contact: {
    sections: [
      {
        type: 'header',
        skeletonType: 'heading',
        class: 'mb-6',
      },
      {
        type: 'content',
        class: 'px-2',
        elevation: 4,
        columns: [
          {
            id: 'form',
            cols: 12,
            md: 12,
            items: [
              { skeletonType: 'list-item', class: 'mb-4' },
              { skeletonType: 'list-item', class: 'mb-4' },
              { skeletonType: 'button@2', class: 'mb-4' },
            ],
          },
        ],
      },
    ],
  },
};
