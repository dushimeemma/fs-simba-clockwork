/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ListItem = ({ url, imageUrl, title }: Props) => {
  return (
    <li className="w-full my-2">
      <a
        href={url}
        className="flex items-center justify-start w-full px-2 py-1 text-gray-300 hover:text-primary hover:bg-secondary">
        {imageUrl}
        <span className="ml-3">{title}</span>
      </a>
    </li>
  );
};

interface Props {
  url: string;
  imageUrl: any;
  title: string;
}

export default ListItem;
