import { memo } from 'react';

const ListItem = memo((props: { first: string, second: string }) => {
  const { first, second } = props;

  return (
    <div className="is-flex is-gap-1">
      <div className="is-flex-grow-1">
        <p className="content">{first}</p>
      </div>
      <div className="is-flex-shrink-0">
        <p className="content has-text-right">{`${second}$`}</p>
      </div>
    </div>
  );
});

export default ListItem;
